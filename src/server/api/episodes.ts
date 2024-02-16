import db from "../../modules/db";
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

export {
    getTotalEpisodeCount,
    getLatestEpisode
};