/*
  Warnings:

  - You are about to drop the `egresos_mensuales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ingresos_mensuales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "egresos_mensuales" DROP CONSTRAINT "egresos_mensuales_balanceId_fkey";

-- DropForeignKey
ALTER TABLE "ingresos_mensuales" DROP CONSTRAINT "ingresos_mensuales_balanceId_fkey";

-- DropTable
DROP TABLE "egresos_mensuales";

-- DropTable
DROP TABLE "ingresos_mensuales";

-- CreateTable
CREATE TABLE "ingresosMensuales" (
    "id" SERIAL NOT NULL,
    "anio" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "monto" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "balanceId" INTEGER NOT NULL,
    "createAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingresosMensuales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "egresosMensuales" (
    "id" SERIAL NOT NULL,
    "anio" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "monto" INTEGER NOT NULL,
    "balanceId" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "createAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "egresosMensuales_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingresosMensuales" ADD CONSTRAINT "ingresosMensuales_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "balance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "egresosMensuales" ADD CONSTRAINT "egresosMensuales_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "balance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
