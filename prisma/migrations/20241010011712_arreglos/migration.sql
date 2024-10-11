-- CreateEnum
CREATE TYPE "Categorias" AS ENUM ('C7', 'C9', 'C11', 'C13', 'C15', 'C17', 'C19', 'C20', 'PRIMERA', 'SENIOR', 'VETERANO');

-- CreateEnum
CREATE TYPE "UsuarioRoles" AS ENUM ('ADMIN', 'COBRADOR', 'SUPER');

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
    "createAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jugadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cuotas" (
    "id" SERIAL NOT NULL,
    "anio" TEXT NOT NULL,
    "mes" TEXT NOT NULL,
    "monto" INTEGER NOT NULL,
    "fechaPago" TEXT NOT NULL,
    "jugadorId" INTEGER NOT NULL,
    "comprobantePago" TEXT NOT NULL,
    "createAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cuotas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "createAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recaudacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "eventoId" INTEGER NOT NULL,
    "reciboInicial" INTEGER NOT NULL,
    "reciboFinal" INTEGER NOT NULL,
    "createAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recaudacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gastos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "monto" INTEGER NOT NULL,
    "eventoId" INTEGER NOT NULL,
    "createAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gastos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UsuarioRoles" NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jugadores_dni_key" ON "jugadores"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "cuotas_comprobantePago_key" ON "cuotas"("comprobantePago");

-- AddForeignKey
ALTER TABLE "cuotas" ADD CONSTRAINT "cuotas_jugadorId_fkey" FOREIGN KEY ("jugadorId") REFERENCES "jugadores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recaudacion" ADD CONSTRAINT "recaudacion_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "eventos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gastos" ADD CONSTRAINT "gastos_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "eventos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
