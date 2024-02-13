import express from 'express';
import morgan from "morgan";
import Parser from "rss-parser";

const app = express();
app.use(morgan('dev'));

const parser = new Parser();

parser.parseURL('https://rss.art19.com/masters-of-scale')
    .then(feed => {
        feed.items.forEach(async (item) => {
            console.log(item.title);
            console.log(item.link);
        });
    });

app.get('/', (req, res) => {
    res.json({'hello': 'world'});
});

const port = Number(process.env.PORT) || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port http://localhost:${port}`);
})
