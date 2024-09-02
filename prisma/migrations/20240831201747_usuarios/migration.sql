/*
  Warnings:

  - You are about to drop the column `itemGastos` on the `administracion` table. All the data in the column will be lost.
  - You are about to drop the column `monto` on the `administracion` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[comprobantePago]` on the table `cuotas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UsuarioRoles" AS ENUM ('ADMIN', 'COBRADOR', 'SUPER');

-- AlterTable
ALTER TABLE "administracion" DROP COLUMN "itemGastos",
DROP COLUMN "monto";

-- CreateTable
CREATE TABLE "gastos" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "monto" INTEGER NOT NULL,
    "administracionId" INTEGER NOT NULL,

    CONSTRAINT "gastos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UsuarioRoles" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cuotas_comprobantePago_key" ON "cuotas"("comprobantePago");

-- AddForeignKey
ALTER TABLE "gastos" ADD CONSTRAINT "gastos_administracionId_fkey" FOREIGN KEY ("administracionId") REFERENCES "administracion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
