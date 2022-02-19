-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "products" JSONB NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);
