-- DropForeignKey
ALTER TABLE "episodes" DROP CONSTRAINT "episodes_feed_id_fkey";

-- AlterTable
ALTER TABLE "episodes" ALTER COLUMN "feed_id" DROP NOT NULL,
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_feed_id_fkey" FOREIGN KEY ("feed_id") REFERENCES "feeds"("feed_id") ON DELETE SET NULL ON UPDATE CASCADE;
