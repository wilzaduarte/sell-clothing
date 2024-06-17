/*
  Warnings:

  - You are about to drop the column `color` on the `Clothing` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `Clothing` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Clothing` table. All the data in the column will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `link` to the `Clothing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Clothing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_clothingId_fkey";

-- AlterTable
ALTER TABLE "Clothing" DROP COLUMN "color",
DROP COLUMN "sellerId",
DROP COLUMN "size",
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Products";
