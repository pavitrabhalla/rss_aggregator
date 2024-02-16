import express from 'express';
import { getLatestEpisode, refreshEpisodeData, getTotalEpisodeCount } from './handlers/episodesHandler';
import { CronJob } from 'cron';

const cronJob = new CronJob('* * * * *', async () => {
    try {
        await refreshEpisodeData();
    } catch (e) {
        console.error(e);
    }
});
cronJob.start();

const app = express();
type apiResponse = {
    episodeCount: number;
    latestEpisode: any;
}
app.set('json spaces', 4);

app.get('/', async(_: any, res: { json: (arg0: apiResponse ) => void; }) => {
    const latest = await getLatestEpisode();
    const count = await getTotalEpisodeCount();
    res.json({ "episodeCount": count, "latestEpisode": latest });
});

const port = Number(process.env.PORT) || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port http://localhost:${port}`);
})
