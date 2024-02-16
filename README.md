# RSS Aggregator

This service scrapes a given set of podcast RSS feeds and stores the scraped episode data in a Postgres database.

## Stack
**NodeJS** app with an **Express** server written in **Typescript**, using a **Postgres** database. All components are setup to run with **Docker**.

I use `pnpm` to manage packages

`swc` to transpile Typescript to Javascript

`prisma` for orm

`rss-parser` to parse rss feeds

`cron` to run cron jobs

## Local environment setup

### Install pnpm globally
`npm install -g pnpm`

### Install Docker
https://docs.docker.com/desktop/install/mac-install/

### Build docker containers
`docker compose build`

### Run the app
`docker compose up`

### Run database migrations
`docker compose run backend pnpm db:migrate`

### Seed the database with RSS Feed sources
`pnpm db:seed`

## Usage & Manual Verification

Once the server is running, it will automatically fetch RSS feed data once every minute to see if there are any new episodes. If there is a new episode, it will be added to the database.
For demo purposes, the root endpoint of the server returns the data for the most recently published episode.

Local server is accessible at `http://localhost:8001/`

You can also check the contents of the database by running the following command:
`pnpm db:console`

I ran these queries to confirm that my logic was working correctly and no duplicates were being added to the database:

```
SELECT count(*) from episodes;
```

```
SELECT title, feed_id, COUNT(DISTINCT title) AS distinct_entries_count
FROM episodes
GROUP BY title, feed_id
HAVING COUNT(DISTINCT title) > 1;
```

## Potential Code Improvements
- Didn't do TDD, could have written tests for the code
- Could add more acceptance tests
- Assumed that the episodes will always have the required fields in the RSS feed, could add more error handling around that
- Could add more error handling around the database queries
- Could separate out the express server, routes, and the cron job into separate files
- Could add more logging
