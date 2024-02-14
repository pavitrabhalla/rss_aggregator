-- CreateTable
CREATE TABLE "feeds" (
    "feed_id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feeds_pkey" PRIMARY KEY ("feed_id")
);

-- CreateTable
CREATE TABLE "episodes" (
    "episode_id" TEXT NOT NULL,
    "feed_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT,
    "description" TEXT,
    "published_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("episode_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "feeds_link_key" ON "feeds"("link");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_feed_id_title_link_key" ON "episodes"("feed_id", "title", "link");

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_feed_id_fkey" FOREIGN KEY ("feed_id") REFERENCES "feeds"("feed_id") ON DELETE RESTRICT ON UPDATE CASCADE;
