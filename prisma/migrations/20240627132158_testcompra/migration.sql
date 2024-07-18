-- CreateTable
CREATE TABLE "PaymentClothing" (
    "paymentId" INTEGER NOT NULL,
    "clothingId" INTEGER NOT NULL,

    CONSTRAINT "PaymentClothing_pkey" PRIMARY KEY ("paymentId","clothingId")
);

-- AddForeignKey
ALTER TABLE "PaymentClothing" ADD CONSTRAINT "PaymentClothing_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentClothing" ADD CONSTRAINT "PaymentClothing_clothingId_fkey" FOREIGN KEY ("clothingId") REFERENCES "Clothing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
