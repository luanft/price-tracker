const Fastify = require('fastify');
const mercurius = require('mercurius');

const app = Fastify();

const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
`;

interface Add {
  x: any;
  y: any;
}

const resolvers = {
  Query: {
    add: async (_: any, { x, y }: Add) => x + y,
  },
};

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
  subscription: true,
});

app.get('/', async function (req: any, reply: any) {
  const query = '{ add(x: 2, y: 2) }';
  return reply.graphql(query);
});

const port = process.env.PORT || 3000;

const start = async (): Promise<void> => {
  try {
    await app.listen(port, '0.0.0.0');
    console.log('\n App is running at:');
    console.log(` - Local: http://localhost:${port} 🚀`);
    console.log(` - Playground: http://localhost:${port}/graphiql 🚀`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();


