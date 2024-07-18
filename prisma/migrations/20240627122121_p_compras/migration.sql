/*
  Warnings:

  - Added the required column `age` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardNumber` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "cardNumber" INTEGER NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
