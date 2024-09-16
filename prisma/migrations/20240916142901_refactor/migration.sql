/*
  Warnings:

  - You are about to alter the column `count` on the `Url` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Url" ALTER COLUMN "count" SET DATA TYPE INTEGER;
