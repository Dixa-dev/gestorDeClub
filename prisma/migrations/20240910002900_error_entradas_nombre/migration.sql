/*
  Warnings:

  - You are about to drop the column `recaudacionEntadas` on the `administracion` table. All the data in the column will be lost.
  - Added the required column `recaudacionEntradas` to the `administracion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "administracion" DROP COLUMN "recaudacionEntadas",
ADD COLUMN     "recaudacionEntradas" INTEGER NOT NULL;
