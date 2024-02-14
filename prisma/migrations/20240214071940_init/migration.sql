-- CreateTable
CREATE TABLE "feeds" (
    "feedId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feeds_pkey" PRIMARY KEY ("feedId")
);

-- CreateTable
CREATE TABLE "episodes" (
    "episodeId" TEXT NOT NULL,
    "feedId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("episodeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "feeds_link_key" ON "feeds"("link");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_title_key" ON "episodes"("title");

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "feeds"("feedId") ON DELETE RESTRICT ON UPDATE CASCADE;
