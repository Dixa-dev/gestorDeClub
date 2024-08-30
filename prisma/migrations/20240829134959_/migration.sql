-- CreateEnum
CREATE TYPE "Categorias" AS ENUM ('C7', 'C9', 'C11', 'C13', 'C15', 'C17', 'C19', 'C20', 'PRIMERA', 'SENIOR', 'VETERANO');

-- CreateTable
CREATE TABLE "jugadores" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "celularEmergencia" TEXT NOT NULL,
    "fechaNacimiento" TEXT NOT NULL,
    "categoria" "Categorias" NOT NULL,

    CONSTRAINT "jugadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cuotas" (
    "id" SERIAL NOT NULL,
    "mes" TEXT NOT NULL,
    "monto" INTEGER NOT NULL,
    "fechaPago" TEXT NOT NULL,
    "jugadorId" INTEGER NOT NULL,
    "comprobantePago" TEXT NOT NULL,

    CONSTRAINT "cuotas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jugadores_dni_key" ON "jugadores"("dni");

-- AddForeignKey
ALTER TABLE "cuotas" ADD CONSTRAINT "cuotas_jugadorId_fkey" FOREIGN KEY ("jugadorId") REFERENCES "jugadores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
