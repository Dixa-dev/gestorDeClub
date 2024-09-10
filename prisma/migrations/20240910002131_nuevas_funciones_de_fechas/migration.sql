/*
  Warnings:

  - Added the required column `updatedAt` to the `administracion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anio` to the `cuotas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `cuotas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `gastos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `jugadores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "administracion" ADD COLUMN     "createAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "cuotas" ADD COLUMN     "anio" TEXT NOT NULL,
ADD COLUMN     "createAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "gastos" ADD COLUMN     "createAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "jugadores" ADD COLUMN     "createAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
