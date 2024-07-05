"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const cards = require("../data/cards.js");
const prisma = new client_1.PrismaClient();
// reset command: npx prisma migrate reset
// seed command: npx prisma db seed
async function main() {
    const level = await prisma.level.create({
        data: {
            title: "Level 1",
            subLevels: {
                create: {
                    title: "Sublevel 1",
                    audio: "Audio level 1",
                    cards: {
                        create: cards,
                    },
                    question: {
                        create: {
                            title: "She ______ funny.",
                            answers: {
                                create: [{ answer: "is" }, { answer: "am" }, { answer: "are" }],
                            },
                            correctAnswer: "is",
                            answeredCorrectly: false,
                            gramarLevel: "1.1 Subject Pronouns",
                            userAnswer: null,
                        },
                    },
                },
            },
        },
        include: {
            subLevels: {
                include: { cards: true },
            },
        },
    });
    console.log({ level });
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
//# sourceMappingURL=seed.js.map