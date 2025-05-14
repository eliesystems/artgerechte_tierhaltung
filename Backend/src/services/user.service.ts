import prisma from '../utils/prisma';

export const saveUserId = async (userId: string) => {
	
  const existingUser = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    await prisma.users.create({
      data: {
        id: userId,
      },
    });
  }

  return existingUser || { id: userId };
};