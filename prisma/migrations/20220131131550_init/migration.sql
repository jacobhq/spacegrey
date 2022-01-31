-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "salePrice" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" TEXT NOT NULL,
    "flag" TEXT,
    "description" TEXT,
    "buyUrl" TEXT NOT NULL,
    "marketplace" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id")
);
