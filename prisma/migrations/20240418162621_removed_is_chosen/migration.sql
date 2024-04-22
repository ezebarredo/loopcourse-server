/*
  Warnings:

  - You are about to drop the column `isChosen` on the `Answer` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "answer" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Answer" ("answer", "id", "questionId") SELECT "answer", "id", "questionId" FROM "Answer";
DROP TABLE "Answer";
ALTER TABLE "new_Answer" RENAME TO "Answer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
