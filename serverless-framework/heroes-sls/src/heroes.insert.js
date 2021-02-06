const uuid = require("uuid");
const Joi = require("@hapi/joi");
const decoratorValidator = require("./util/decoratorValidator");
const globalEnum = require("./util/globalEnum");
class Handler {
  static validator() {
    return Joi.object({
      nome: Joi.string().max(100).min(2).required(),
      poder: Joi.string().max(50).min(2).required(),
    });
  }
  constructor({ dynamoDBSvc }) {
    this.dynamoDBSvc = dynamoDBSvc;
    this.dynamoDBTable = process.env.DYNAMODB_TABLE;
  }
  async insertItem(params) {
    return this.dynamoDBSvc.put(params).promise();
  }
  prepareData(data) {
    const params = {
      TableName: this.dynamoDBTable,
      Item: { id: uuid.v1(), ...data },
      createdAt: new Date().toISOString(),
    };
    return params;
  }
  handlerSuccess(data) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };
    return response;
  }

  handlerError(data) {
    const response = {
      statusCode: data.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: "Couln't  create item!!",
    };
    return response;
  }
  async main(event) {
    try {
      // agora o decorator modifica o body e ja
      // retorna no formato JSON
      const data = event.body;

      const dbParams = this.prepareData(data);
      await this.insertItem(dbParams);
      return this.handlerSuccess(dbParams.Item);
    } catch (error) {
      console.log("Deu ruim**", error);
      return this.handlerError({ statusCode: 500 });
    }
  }
}
//factory
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const handler = new Handler({
  dynamoDBSvc: dynamoDB,
});
module.exports = decoratorValidator(
  handler.main.bind(handler),
  Handler.validator(),
  globalEnum.ARG_TYPE.BODY
);
