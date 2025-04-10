import prisma from '../utils/prisma';  // Assuming you're using Prisma

export const saveUserId = async (userId: string) => {
	
  // Check if the user already exists
  const existingUser = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    // Create a new user in the database if it doesn't exist
    await prisma.users.create({
      data: {
        id: userId,
      },
    });
  }

  return existingUser || { id: userId };  // Return existing or newly created user
};