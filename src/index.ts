// import express from 'express';
// import morgan from "morgan";
import db from "./modules/db";
import Parser from "rss-parser";
import * as console from "console";

const parser = new Parser();
async function getFeeds() {
    return await db.feed.findMany();
}

getFeeds().then((feed) => {
    feed.forEach((f) => {
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
                        }
                    });
                });
            });
    });
});

// const app = express();
// app.use(morgan('dev'));
//
// app.get('/', (req, res) => {
//     res.json({'hello': 'world'});
// });
//
// const port = Number(process.env.PORT) || 8080;
// app.listen(port, '0.0.0.0', () => {
//     console.log(`Server is running on port http://localhost:${port}`);
// })
