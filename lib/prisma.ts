// Module '"@prisma/client"' has no exported member 'PrismaClient'. 
// 参考：https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help
import { PrismaClient } from '@/generated/prisma'

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;