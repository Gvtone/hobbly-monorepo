-- CreateEnum
CREATE TYPE "HobbyStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Hobby" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "description" TEXT,
    "status" "HobbyStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "Hobby_pkey" PRIMARY KEY ("id")
);
