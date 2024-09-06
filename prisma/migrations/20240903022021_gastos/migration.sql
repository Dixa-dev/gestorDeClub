/*
  Warnings:

  - Added the required column `titulo` to the `administracion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "administracion" ADD COLUMN     "titulo" TEXT NOT NULL;
