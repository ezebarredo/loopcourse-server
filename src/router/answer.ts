import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import type { Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

// /api/answers/:answerId

// PATCH 1 ANSWER with answerdId
export const patchAnswer = async (request: Request, response: Response) => {
  const {
    params: { answerId },
    body: { answer },
  } = request;

  const updateAnswerInfo = await prisma.answer.update({
    where: { id: Number(answerId) },
    data: {
      answer,
    },
  });
  response.status(200).json({ updateAnswerInfo });
};

router.patch("/:answerId", patchAnswer);
export default router;
