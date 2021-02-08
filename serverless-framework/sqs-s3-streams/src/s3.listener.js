const AWS = require("aws-sdk");
const { Writable, pipeline } = require("stream");
const csvtojson = require("csvtojson");
class Hander {
  constructor({ sqsSvc, s3Svc }) {
    this.sqsSvc = sqsSvc;
    this.s3Svc = s3Svc;
    this.queueName = process.env.QUEUE_URL;
  }
  static getSdks() {
    const host = process.env.LOCALSTACK_HOST || "localhost";
    const s3Port = (process.env.S3_PORT = "4566");
    const sqsPort = (process.env.SQS_PORT = "4566");
    const isLocal = process.env.IS_LOCAL;
    const s3Endpoint = new AWS.Endpoint(`http://${host}:${s3Port}`);
    const s3Config = {
      endpoint: s3Endpoint,
      s3ForcePathStyle: true,
    };
    const sqsEndpoint = new AWS.Endpoint(`http://${host}:${sqsPort}`);
    const sqsConfig = {
      endpoint: sqsEndpoint,
    };
    if (!isLocal) {
      delete s3Config.endpoint;
      delete sqsConfig.endpoint;
    }
    return {
      s3: new AWS.S3(s3Config),
      sqs: new AWS.SQS(sqsConfig),
    };
  }
  async getQueueUrl() {
    const { QueueUrl } = await this.sqsSvc
      .getQueueUrl({
        QueueName: this.queueName,
      })
      .promise();
    return QueueUrl;
  }

  processDataOnDemand(queueUrl) {
    const writableStream = new Writable({
      write: (chunk, encoding, done) => {
        const item = chunk.toString();
        console.log("sending...", item, "at", new Date().toISOString());
        this.sqsSvc.sendMessage(
          {
            QueueUrl: queueUrl,
            MessageBody: item,
          },
          done
        );
      },
    });

    return writableStream;
  }
  async pipefyStreams(...args) {
    return new Promise((resolve, reject) => {
      pipeline(...args, (error) => (error ? reject(error) : resolve(error)));
    });
  }
  async main(event) {
    try {
      const queueUrl = await this.getQueueUrl();
      console.log("queueUrl", queueUrl);
      const [
        {
          s3: {
            bucket: { name },
            object: { key },
          },
        },
      ] = event.Records;
      const params = {
        Bucket: name,
        Key: key,
      };
      await this.pipefyStreams(
        this.s3Svc.getObject(params).createReadStream(),
        csvtojson(),
        this.processDataOnDemand(queueUrl)
      );
      console.log("process finished...", new Date().toISOString());

      return {
        statusCode: 200,
        body: "Process finished with success!",
      };
    } catch (error) {
      console.log("deu ruim**", error.stack);
      return {
        statusCode: 500,
        body: "Internal server error!!",
      };
    }
  }
}
// factory
const { s3, sqs } = Hander.getSdks();
const hander = new Hander({ sqsSvc: sqs, s3Svc: s3 });
module.exports = hander.main.bind(hander);
