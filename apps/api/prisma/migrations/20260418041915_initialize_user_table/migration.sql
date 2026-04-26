-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'HOBBYIST');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PRIVATE', 'PUBLIC');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "displayName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicture" TEXT,
    "coverImage" TEXT,
    "bio" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'HOBBYIST',
    "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_id_username_idx" ON "User"("id", "username");
