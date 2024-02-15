import express from 'express';
import db from "./modules/db";
import Parser from "rss-parser";
import { CronJob } from 'cron';

const parser = new Parser();
async function getFeeds() {
    return await db.feed.findMany();
}

async function updateEpisodes() {
    const feeds = await getFeeds();
    feeds.forEach((f) => {
        parser.parseURL(f.link)
            .then(feed => {
                feed.items.forEach(async (item) => {
                    db.episode.findFirst({
                        where: {
                            title: item.title,
                            feedId: f.feedId
                        }
                    }).then(async (result) => {
                        if (result === null) {
                            console.log("Creating new episode: " + item.title);
                            await db.episode.create({
                                data: {
                                    title: item.title ? item.title : '',
                                    link: item.link,
                                    publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
                                    description: item.description,
                                    feedId: f.feedId
                                }
                            });
                        } else return;
                    });
                });
            });
    });
}

const cronJob = new CronJob('* * * * *', async () => {
    try {
        await updateEpisodes();
    } catch (e) {
        console.error(e);
    }
});

cronJob.start();

const app = express();

function getLatestEpisode() {
    return db.episode.findMany({
        orderBy: {
            publishedAt: 'desc'
        },
        take: 1,
        select: {
            title: true,
            link: true,
            publishedAt: true,
            description: true,
            feed: {
                select: {
                    title: true
                }
            }
        }
    });
}
app.set('json spaces', 4);

app.get('/', async(req, res) => {
    const latest = await getLatestEpisode();
    res.json({ "latestEpisode": latest });
});

const port = Number(process.env.PORT) || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port http://localhost:${port}`);
})
