import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import type { Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

// PATCH 1 Level with levelId
export const patchLevel = async (request: Request, response: Response) => {
  const {
    params: { levelId },
    body,
  } = request;

  const updateLevelInfo = await prisma.level.update({
    where: { id: Number(levelId) },
    data: {
      title: body.title,
    },
  });
  response.status(200).json({ updateLevelInfo });
};

router.patch("/:levelId", patchLevel);
export default router;
