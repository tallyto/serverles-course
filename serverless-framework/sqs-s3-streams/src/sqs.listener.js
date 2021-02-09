const AWS = require('aws-sdk')
class Hander {
  async main(event) {
    const [{ body, messageId }] = event.Records;
    const item = JSON.parse(body);
    console.log(
      "**event",
      JSON.stringify(
        { ...item, messageId, at: new Date().toISOString() },
        null,
        2
      )
    );
    try {
      return {
        statusCode: 200,
        body: "Hello",
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
const hander = new Hander();
module.exports = hander.main.bind(hander);
