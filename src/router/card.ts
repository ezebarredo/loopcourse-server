import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import type { Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

// export const getCards = async (
//   req: Request,
//   res: Response
//  ): Promise<void> => {
//   res.json( ...something here... )
//  }

//PATCH cardId
export const patchCard = async (request: Request, response: Response) => {
  const {
    params: { cardId },
    body: { front, back },
  } = request;

  const updateCardInfo = await prisma.card.update({
    where: { id: Number(cardId) },
    data: {
      front,
      back,
    },
  });
  response.status(200).json({ updateCardInfo });
};

// router.get("/", getCards);
router.patch("/:cardId", patchCard);
export default router;
