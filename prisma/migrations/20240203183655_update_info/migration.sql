-- AlterTable
ALTER TABLE "Clientes" ALTER COLUMN "fechaActualizacion" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Pedidos" ALTER COLUMN "fechaActualizacion" DROP DEFAULT;

-- AlterTable
ALTER TABLE "PedidosItems" ALTER COLUMN "fechaActualizacion" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Productos" ALTER COLUMN "fechaActualizacion" DROP DEFAULT;
