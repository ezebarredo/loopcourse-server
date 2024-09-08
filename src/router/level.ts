import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import type { Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

//GET all levels
export const getLevels = async (request: Request, response: Response) => {
  const getAllLevels = await prisma.level.findMany();
  response.status(200).json({ getAllLevels });
};

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

//GET 1 Sublevels with cards, questions and answers
export const getSublevelsCardsQuestionsAnswers = async (
  request: Request,
  response: Response
) => {
  const {
    params: { levelId, sublevelId },
  } = request;

  const getSublevel = await prisma.subLevel.findUnique({
    where: { id: Number(sublevelId) },
    include: {
      question: { include: { answers: true } },
      cards: true,
    },
  });
  response.status(200).json({ getSublevel });
};

//GET 1 Level and 1 sublevel
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

router.get("", getLevels);
router.get("/:levelId/sublevels", getSublevels);
router.get(
  "/:levelId/sublevels/:sublevelId",
  getSublevelsCardsQuestionsAnswers
);
router.get("/:levelId", getLevel);
router.patch("/:levelId", patchLevel);

export default router;
