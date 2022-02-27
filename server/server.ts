import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const schema = `
  directive @auth(
    requires: Role = ADMIN,
  ) on OBJECT | FIELD_DEFINITION

  enum Role {
    ADMIN
    REVIEWER
    USER
    UNKNOWN
  }

  type User {
    id: Int
    name: String
    email: String
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }

  type Query {
    users: [User]!
  }
`;

interface User {
  id: Number;
  name: String;
  email: String;
}

const resolvers = {
  Query: {
    users: async (_: any, args: any, { prisma }: any) => {
      return await prisma.user.findMany();
    },
  },

  Mutation: {
    createUser: async (_: any, {name, email }: User, { prisma }: any) => {
      return await prisma.user.create({
        data: {
          name,
          email,
        },
      });
    },
  },
};

const context = (request: any, reply: any) => {
  return { prisma };
};

export { schema, resolvers, context };
export default { schema, resolvers, context };
