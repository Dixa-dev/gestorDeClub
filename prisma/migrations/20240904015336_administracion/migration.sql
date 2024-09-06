-- DropForeignKey
ALTER TABLE "gastos" DROP CONSTRAINT "gastos_administracionId_fkey";

-- AddForeignKey
ALTER TABLE "gastos" ADD CONSTRAINT "gastos_administracionId_fkey" FOREIGN KEY ("administracionId") REFERENCES "administracion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
