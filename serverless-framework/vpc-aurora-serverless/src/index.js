const fake = require('faker');
const {
  HeroiSchema,
  sequelize
} = require('../database')
const handler = async event => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully')
  } catch (error) {
    console.log('Unable to connect to the databse', error.stack)
    return {
      statusCode: 500,
      body: 'ERRR'
    }
  }

  await HeroiSchema.sync()
  const result = await HeroiSchema.create({
    nome: fake.name.title(),
    poder: fake.name.jobTitle()
  })

  const all = await HeroiSchema.findAll({
    raw: true,
    attributes: ['nome', 'poder', 'id']
  })

  return {
    body: JSON.stringify({result, all})
  }


}


exports.handler = handler
