const dynamoose = require("dynamoose");
const Schema = dynamoose.Schema;

const schema = new Schema(
  {
    id: {
      type: String,
      required: true,
      hashKey: true,
    },
    name: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  { timestamps: true, saveUnknown: true }
);

const model = dynamoose.model(process.env.HEROES_TABLE, schema);

module.exports = model;
