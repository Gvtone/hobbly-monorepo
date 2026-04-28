-- CreateIndex
CREATE INDEX "Entry_id_userHobbyId_idx" ON "Entry"("id", "userHobbyId");

-- CreateIndex
CREATE INDEX "EntryMood_id_idx" ON "EntryMood"("id");

-- CreateIndex
CREATE INDEX "Hobby_id_name_idx" ON "Hobby"("id", "name");

-- CreateIndex
CREATE INDEX "UserHobby_id_userId_hobbyId_idx" ON "UserHobby"("id", "userId", "hobbyId");
