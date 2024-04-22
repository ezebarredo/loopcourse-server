import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // CREATE card
  // const card = await prisma.card.createMany({
  //   data: [
  //     {
  //       front: "One",
  //       back: "She",
  //       image: "",
  //     },
  //     {
  //       front: "Ty",
  //       back: "You",
  //       image: "",
  //     },
  //     {
  //       front: "On",
  //       back: "He",
  //       image: "",
  //     },
  //   ],
  // });
  // console.log(card);

  // DELETE CARD
  // const deletedCard = await prisma.card.delete({
  //   where: { id: 6 },
  // });
  // console.log("Deleted card:" + deletedCard);

  // DELETE ALL CARDS
  // const deleteAllCards = await prisma.card.deleteMany();
  // console.log(`Cards deleted ${deleteAllCards}`);

  // CODE to run query: npx ts-node src/script.ts
  //Show All Cards
  const allCards = await prisma.card.findMany();
  console.log(allCards);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
