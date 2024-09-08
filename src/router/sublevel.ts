import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import type { Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

export const getCards = async (request: Request, response: Response) => {
  const {
    params: { sublevelId },
  } = request;

  const getAllCards = await prisma.card.findMany();

  response.status(200).json({ getAllCards });
};

//Get 1 question with 3 answers
export const getQuestion = async (request: Request, response: Response) => {
  const {
    params: { questionId },
  } = request;

  const getQuestion = await prisma.question.findUnique({
    where: { id: Number(questionId) },
    include: {
      answers: true,
    },
  });
  response.status(200).json({ getQuestion });
};

//PATCH 1 Sublevel with title/audio
export const patchSublevel = async (request: Request, response: Response) => {
  const {
    params: { sublevelId },
    body,
  } = request;

  const updateSublevelInfo = prisma.subLevel.update({
    where: { id: Number(sublevelId) },
    data: {
      title: body.title,
      audio: body.audio,
      question: {
        update: {
          data: {
            title: body.question.title,
          },
        },
      },
    },
    include: {
      question: {
        include: {
          answers: true,
        },
      },
    },
  });

  const [subLevelInfo] = await prisma.$transaction([updateSublevelInfo]);

  response.status(200).json({
    subLevelInfo,
  });
};

router.get("/:sublevelId/cards", getCards);
router.get("/:questionId", getQuestion);
router.patch("/:sublevelId", patchSublevel);
export default router;
