-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'ATTACK_HELICOPTER');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('COUNSELOR', 'CLIENT');

-- CreateEnum
CREATE TYPE "Channel" AS ENUM ('INSTAGRAM', 'LINE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nama_role" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "organization_code" TEXT NOT NULL,
    "token" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "faculty" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "channel" "Channel",

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
