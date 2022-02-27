interface User {
  id: Number;
  name: String;
  email: String;
}

const userResolvers = {
  Query: {
    users: async (_: any, args: any, { prisma }: any) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    createUser: async (_: any, { name, email }: any, { prisma }: any) => {
      return await prisma.user.create({
        data: {
          name,
          email,
        },
      });
    },
  },
};

export default userResolvers;
export { userResolvers };
