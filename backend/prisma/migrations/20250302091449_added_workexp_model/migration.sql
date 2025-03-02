-- AlterTable
ALTER TABLE "User" ADD COLUMN     "skills" TEXT[];

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fromMonth" TEXT NOT NULL,
    "fromYear" TEXT NOT NULL,
    "isCurrentlyWorking" BOOLEAN NOT NULL DEFAULT false,
    "toMonth" TEXT,
    "toYear" TEXT,
    "description" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
