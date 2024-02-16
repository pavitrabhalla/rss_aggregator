import db from "../modules/db";
import Parser from "rss-parser";
import type { Feed } from '@prisma/client';
import type { Episode } from '@prisma/client';

const parser: Parser<Feed, Episode> = new Parser();

const getLatestEpisode = () => {
    return db.episode.findMany({
        orderBy: {
            pubDate: 'desc'
        },
        take: 1,
        select: {
            title: true,
            link: true,
            pubDate: true,
            description: true,
            feed: {
                select: {
                    title: true
                }
            }
        }
    });
}
const getTotalEpisodeCount = async () => {
    return db.episode.count();
}
const getFeeds = async () => {
    return db.feed.findMany();
}
const getEpisodesFromFeed = async (feed: Feed) => {
    return parser.parseURL(feed.link);
}
const checkIfEpisodeExists = async (episode: Episode, feed: Feed) => {
    return db.episode.findFirst({
        where: {
            title: episode.title,
            feedId: feed.feedId
        }
    });
}
const addEpisodeToDb = async (episode: Episode, feed: Feed) => {
    console.log("Creating new episode: " + episode.title);
    await db.episode.create({
        data: {
            title: episode.title ? episode.title : '',
            link: episode.link,
            pubDate: episode.pubDate ? new Date(episode.pubDate) : new Date(),
            description: episode.description,
            feedId: feed.feedId
        }
    });
}

const updateEpisodes = async (episodes: Parser.Output<Episode>, feed: Feed) => {
    for (const episode of episodes.items) {
        const exists = await checkIfEpisodeExists(episode, feed)
        if (!exists) {
            await addEpisodeToDb(episode, feed)
        } else {
            return;
        }
    }
}

const refreshEpisodeData = async () => {
    const feeds = await getFeeds();
    for (const feed of feeds) {
        const episodes = await getEpisodesFromFeed(feed);
        await updateEpisodes(episodes, feed);
    }
}

export {
    getLatestEpisode,
    refreshEpisodeData,
    getTotalEpisodeCount
}
