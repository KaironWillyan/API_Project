/*
  Warnings:

  - You are about to drop the column `fistName` on the `Alunos` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Alunos` table. All the data in the column will be lost.
  - You are about to drop the column `media` on the `Alunos` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Alunos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lasttName` to the `Alunos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alunos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lasttName" TEXT NOT NULL,
    "nota1" REAL NOT NULL,
    "nota2" REAL NOT NULL
);
INSERT INTO "new_Alunos" ("id", "nota1", "nota2") SELECT "id", "nota1", "nota2" FROM "Alunos";
DROP TABLE "Alunos";
ALTER TABLE "new_Alunos" RENAME TO "Alunos";
CREATE UNIQUE INDEX "Alunos_id_key" ON "Alunos"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
