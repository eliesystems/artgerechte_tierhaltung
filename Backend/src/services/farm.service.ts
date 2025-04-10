import prisma from "../utils/prisma";
import { Prisma } from "@prisma/client"

export const createFarm = async (data: Prisma.farmsCreateInput) => {
  return prisma.farms.create({ data });
};

export const getFarms = async () => {
  return prisma.farms.findMany();
};
