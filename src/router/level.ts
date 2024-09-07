import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import type { Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

// GET 1 Level with all SubLevels
export const getSublevels = async (request: Request, response: Response) => {
  const {
    params: { levelId },
  } = request;
  const getAllSublevels = await prisma.level.findUnique({
    where: { id: Number(levelId) },
    include: {
      subLevels: true,
    },
  });
  response.status(200).json({ getAllSublevels });
};

//get 1 Level and 1 sublevel
export const getLevel = async (request: Request, response: Response) => {
  const {
    params: { levelId },
  } = request;

  const getLevel = await prisma.level.findUnique({
    where: { id: Number(levelId) },
    include: {
      subLevels: true,
    },
  });
  response.status(200).json({ getLevel });
};

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

router.get("/:levelId/sublevels", getSublevels);
router.get("/:levelId", getLevel);
router.patch("/:levelId", patchLevel);

export default router;
