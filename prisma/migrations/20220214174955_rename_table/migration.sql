/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cart";

-- CreateTable
CREATE TABLE "cart" (
    "id" TEXT NOT NULL,
    "products" JSONB NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);
