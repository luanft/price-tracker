import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const context = (request: any, reply: any) => {
  return { prisma };
};

export { context };
export default context;
