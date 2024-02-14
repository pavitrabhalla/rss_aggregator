/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `episodes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "episodes" ADD COLUMN     "link" TEXT;

-- AlterTable
ALTER TABLE "feeds" ALTER COLUMN "title" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "episodes_link_key" ON "episodes"("link");
