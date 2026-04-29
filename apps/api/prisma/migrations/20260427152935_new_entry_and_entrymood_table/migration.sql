-- CreateEnum
CREATE TYPE "HobbyCategory" AS ENUM ('TRACKED', 'CREATIVE', 'JOURNAL', 'GENERAL');

-- AlterTable
ALTER TABLE "Hobby" ADD COLUMN     "category" "HobbyCategory" NOT NULL DEFAULT 'GENERAL';

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userHobbyId" INTEGER NOT NULL,
    "title" TEXT,
    "image" TEXT,
    "moodId" INTEGER,
    "note" TEXT,
    "activityDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE',
    "metadata" JSONB,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntryMood" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "EntryMood_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_moodId_fkey" FOREIGN KEY ("moodId") REFERENCES "EntryMood"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_userHobbyId_fkey" FOREIGN KEY ("userHobbyId") REFERENCES "UserHobby"("id") ON DELETE CASCADE ON UPDATE CASCADE;
