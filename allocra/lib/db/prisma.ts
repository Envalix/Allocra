/**
 * Prisma Database Client
 *
 * This file provides a singleton Prisma client instance to prevent
 * creating multiple connections during development hot reloading.
 *
 * Usage:
 *   import { prisma } from '@/lib/db/prisma';
 *   const users = await prisma.user.findMany();
 */

import { PrismaClient } from '@prisma/client';

// Declare global type for prisma client
declare global {
   
  var prisma: PrismaClient | undefined;
}

// Create Prisma client with logging in development
const createPrismaClient = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });
};

// Use existing global client or create new one
export const prisma = globalThis.prisma ?? createPrismaClient();

// Prevent multiple instances during development hot reloading
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
