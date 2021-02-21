const resolvers = {
  // para cada item que o getHero retornar, vai entrar nessa funcao
  // fazendo uma subquery
  Hero: {
    async skills(root, args, context) {
      const skills = root.skills.map((skill) => context.Skill.findOne(skill));
      const results = await Promise.all(skills)
      const all = results.reduce((prev, next)=> prev.concat(next), [])
      return all;
    },
  },
  // GET
  Query: {
    async getHero(root, args, context, info) {
      return await context.Hero.findAll(args);
    },
  },
  // POST
  Mutation: {
    async createHero(root, args, context, info) {
      const { id } = await context.Hero.create(args);
      return id;
    },
  },
};

module.exports = resolvers;
