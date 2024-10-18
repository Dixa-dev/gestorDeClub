-- CreateTable
CREATE TABLE "balance" (
    "id" SERIAL NOT NULL,
    "anio" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "createAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingresos_mensuales" (
    "id" SERIAL NOT NULL,
    "anio" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "monto" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "balanceId" INTEGER NOT NULL,
    "createAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingresos_mensuales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "egresos_mensuales" (
    "id" SERIAL NOT NULL,
    "anio" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "monto" INTEGER NOT NULL,
    "balanceId" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "createAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "egresos_mensuales_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingresos_mensuales" ADD CONSTRAINT "ingresos_mensuales_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "balance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "egresos_mensuales" ADD CONSTRAINT "egresos_mensuales_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "balance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
