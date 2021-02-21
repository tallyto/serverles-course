const { readdirSync } = require("fs");
const {
  makeExecutableSchema,
  mergeSchemas,
  gql,
} = require("apollo-server-lambda");

// 1o le o diretorio
const schemas = readdirSync(__dirname)
  // ignora o arquivo index.js
  .filter((file) => file !== "index.js")
  // faz o require de cada arquivo index.js dentro das pastas(hero, skill, ...)
  .map((folder) => require(`./${folder}`))
  // cria um schema do GraphQL juntando seus respectivos schemas e resolvers
  .map(({ schema, resolvers }) =>
    makeExecutableSchema({
      // gql serve para validar a string do schema e retornar no formato correto
      // nao e obrigatorio, mas e recomendado
      typeDefs: gql(schema),
      resolvers,
    })
  );

/* 
hero resolver 
{
  Query: { getHero }
} 
skill resolver
{
  Query: { getSill }
}
skill + hero = substituicao do conteudo de Query

mergeSchemas:

{
    Query: {
      getHero,
      getSkill
    }
}
*/

module.exports = mergeSchemas({
  schemas,
});
