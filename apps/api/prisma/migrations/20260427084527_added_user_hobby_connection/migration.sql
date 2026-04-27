-- CreateTable
CREATE TABLE "UserHobby" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "hobbyId" INTEGER NOT NULL,
    "backgroundImage" TEXT,

    CONSTRAINT "UserHobby_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserHobby" ADD CONSTRAINT "UserHobby_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHobby" ADD CONSTRAINT "UserHobby_hobbyId_fkey" FOREIGN KEY ("hobbyId") REFERENCES "Hobby"("id") ON DELETE CASCADE ON UPDATE CASCADE;
