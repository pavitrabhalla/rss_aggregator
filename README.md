# RSS Aggregator

This service scrapes a given set of podcast RSS feeds and stores the episode data in a Postgres database.

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
- `docker compose build`

### Run database migrations
`docker compose run backend pnpm db:migrate`

### Seed the database with RSS Feed sources
`pnpm db:seed`

### Run the app
`docker compose up`

## Usage

Once the server is running, it will fetch RSS feed data once every minute to see if there are any new episodes. If there is a new episode, it will be added to the database.

For demo purposes, the root endpoint of the server returns the data for the most recent episode by publish date.

Local server is accessible at`http://localhost:8001` 