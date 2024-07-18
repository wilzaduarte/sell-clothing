/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "country" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClothingToPurchase" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClothingToPurchase_AB_unique" ON "_ClothingToPurchase"("A", "B");

-- CreateIndex
CREATE INDEX "_ClothingToPurchase_B_index" ON "_ClothingToPurchase"("B");

-- AddForeignKey
ALTER TABLE "_ClothingToPurchase" ADD CONSTRAINT "_ClothingToPurchase_A_fkey" FOREIGN KEY ("A") REFERENCES "Clothing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClothingToPurchase" ADD CONSTRAINT "_ClothingToPurchase_B_fkey" FOREIGN KEY ("B") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
