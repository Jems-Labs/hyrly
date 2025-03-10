-- CreateEnum
CREATE TYPE "NotificationTypes" AS ENUM ('rejected_submission', 'accepted_submission');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "points" DOUBLE PRECISION DEFAULT 0.0;

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "toId" INTEGER NOT NULL,
    "fromId" INTEGER NOT NULL,
    "type" "NotificationTypes" NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
