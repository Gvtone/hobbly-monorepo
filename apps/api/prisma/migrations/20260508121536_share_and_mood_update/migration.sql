-- CreateTable
CREATE TABLE "CurrentMood" (
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "icon" TEXT,
    "color" TEXT
);

-- CreateTable
CREATE TABLE "ProfileShare" (
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "referenceId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CurrentMood_userId_key" ON "CurrentMood"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileShare_userId_key" ON "ProfileShare"("userId");

-- AddForeignKey
ALTER TABLE "CurrentMood" ADD CONSTRAINT "CurrentMood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileShare" ADD CONSTRAINT "ProfileShare_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
