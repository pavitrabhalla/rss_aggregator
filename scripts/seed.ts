import db from "../src/modules/db";
const run = async () => {
    // @ts-ignore
    await db.feed.createMany({
        data: [
            {
                title: 'Masters of Scale',
                link: 'https://rss.art19.com/masters-of-scale'
            },
            {
                title: 'MLOps.community',
                link: 'https://anchor.fm/s/174cb1b8/podcast/rss'
            },
            {
                title: 'Acquired',
                link: 'https://feeds.transistor.fm/acquired'
            },
            {
                title: 'The Twenty Minute VC (20VC): Venture Capital | Startup Funding | The Pitch',
                link: 'https://thetwentyminutevc.libsyn.com/rss'
            }
        ]
    });
}

// Run the function if this file is the entry point
if (require.main === module) {
    run().then(() => {
        console.log('RSS sources added');
        process.exit(0);
    });
}