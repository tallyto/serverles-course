"use strict";

const { ApolloServer, gql } = require("apollo-server-lambda");

const setupDynamoDBClient = require("./src/core/util/setupDynamoDB");
setupDynamoDBClient();
const HeroFactory = require("./src/core/factories/heroFactory");
const SkillFactory = require("./src/core/factories/skillFactory");
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});

async function main() {
  const skillFactory = await SkillFactory.createInstance();
  const heroFactory = await HeroFactory.createInstance();
  const skillId = `${new Date().getTime()}`;
  await skillFactory.create({
    id: skillId,
    name: "Strong",
    value: 99,
  });
  const skillItem = await skillFactory.findOne(skillId);
  const allSkills = await skillFactory.findAll();

  const heroId = `${new Date().getTime()}`;
  await heroFactory.create({
    id: heroId,
    name: "Flash",
    skills: [skillId]
  });

  const hero = await heroFactory.findOne(heroId);
  const allHeroes = await heroFactory.findAll();

  return {
    statusCode: 200,
    body: JSON.stringify({
      hero: { hero, allHeroes },
      skill: {
        skillItem,
        allSkills,
      },
    }),
  };
}

module.exports.test = main;
