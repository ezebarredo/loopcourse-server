/*
  Warnings:

  - Added the required column `subLevelId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Level" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SubLevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "levelId" INTEGER NOT NULL,
    CONSTRAINT "SubLevel_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "answer" TEXT NOT NULL,
    "isChosen" BOOLEAN NOT NULL,
    "questionId" INTEGER NOT NULL,
    CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "answeredCorrectly" BOOLEAN NOT NULL,
    "gramarLevel" TEXT NOT NULL,
    "userAnswer" TEXT,
    "subLevelId" INTEGER NOT NULL,
    CONSTRAINT "Question_subLevelId_fkey" FOREIGN KEY ("subLevelId") REFERENCES "SubLevel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "front" TEXT NOT NULL,
    "back" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "subLevelId" INTEGER NOT NULL,
    CONSTRAINT "Card_subLevelId_fkey" FOREIGN KEY ("subLevelId") REFERENCES "SubLevel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("back", "front", "id", "image") SELECT "back", "front", "id", "image" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Question_subLevelId_key" ON "Question"("subLevelId");
