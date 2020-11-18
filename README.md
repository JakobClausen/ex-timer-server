# Gym hub server

Gym hub is an service that digitises the gym environment 

## Installation

Make sure you have a PostgreSQL database with password and username of "postgres"
Add your database in the .env.example file and remove the .example extension

(IMG)

Start a [Redis](https://redis.io/) server in the terminal

Install all dependencies
```bash
npm install
```
Start the server by running two commands in two separate terminals
```bash
npm run watch
```
and 

```bash
npm run dev
```

Make sure you have our client [ex-timer-web](https://github.com/JakobClausen/ex-timer-web) installed and running correctly

## License
[MIT](https://choosealicense.com/licenses/mit/)
