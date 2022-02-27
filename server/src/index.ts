import Fastify from 'fastify';
import mercurius from 'mercurius';
import mercuriusAuth from 'mercurius-auth';


import { schema, resolvers, context } from './server';

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T

declare module 'mercurius' {
  interface MercuriusContext extends PromiseType<ReturnType<typeof context>> {}
}

const app = Fastify();

app.register(mercurius, {
  schema,
  resolvers,
  context,
  graphiql: true,
  subscription: true,
});

app.register(mercuriusAuth, {
  mode: 'external',
  policy: {
    Query: {
      add: { requires: [] },
    },
  },
  authContext(context) {
    const permissions = context.reply.request.headers['x-user'] || '';
    return { permissions };
  },
  async applyPolicy(policy, parent, args, context, info) {
    return !policy.requires?.length || context?.auth?.permissions.includes(policy.requires);
  },

  // authDirective: 'auth'
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
