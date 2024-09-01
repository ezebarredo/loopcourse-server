import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import type { Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

//PATCH 1 Sublevel with title/audio
export const patchSublevel = async (request: Request, response: Response) => {
  const {
    params: { levelId, sublevelId },
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

router.patch("/:levelId/sublevels/:sublevelId", patchSublevel);
export default router;
