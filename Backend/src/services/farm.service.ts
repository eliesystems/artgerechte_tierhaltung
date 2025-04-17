import { UUID } from "crypto";
import prisma from "../utils/prisma";
import { Prisma } from "@prisma/client"

export const createFarm = async (data: Prisma.farmsCreateInput) => {
  return prisma.farms.create({ data });
};

export const getFarmsByUserId = async (userId: string) => {
  return prisma.farms.findMany({
    where: {
      fk_user_id: userId
    }
  });
};
