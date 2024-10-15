/*
  Warnings:

  - Added the required column `monto` to the `recaudacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recaudacion" ADD COLUMN     "monto" INTEGER NOT NULL;
