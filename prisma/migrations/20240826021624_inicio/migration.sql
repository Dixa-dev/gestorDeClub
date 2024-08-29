-- CreateTable
CREATE TABLE "jugadores" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "celularEmergencia" TEXT NOT NULL,
    "fechaNacimiento" TEXT NOT NULL,

    CONSTRAINT "jugadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "jugadorId" INTEGER NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cuotas" (
    "id" SERIAL NOT NULL,
    "mes" TEXT NOT NULL,
    "monto" TEXT NOT NULL,
    "fechaPago" TEXT NOT NULL,
    "jugadorId" INTEGER NOT NULL,
    "comprobantePago" TEXT NOT NULL,

    CONSTRAINT "cuotas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jugadores_dni_key" ON "jugadores"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_jugadorId_key" ON "categorias"("jugadorId");

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_jugadorId_fkey" FOREIGN KEY ("jugadorId") REFERENCES "jugadores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cuotas" ADD CONSTRAINT "cuotas_jugadorId_fkey" FOREIGN KEY ("jugadorId") REFERENCES "jugadores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
