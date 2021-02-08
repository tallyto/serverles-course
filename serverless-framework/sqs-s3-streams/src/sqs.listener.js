class Hander {
  async main (event) {
    console.log("event**", JSON.stringify(event, null, 2))
    try {
      return {
        statusCode: 200,
        body: 'Hello'
      }
    } catch (error) {
      console.log("deu ruim**", error.stack)
      return {
        statusCode: 500,
        body: 'Internal server error!!'
      }
    }
  }
}

const hander = new Hander()
module.exports = hander.main.bind(hander)
