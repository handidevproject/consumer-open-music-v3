require("dotenv").config();

const config = {
    app: {
        host: process.env.HOST,
        port: process.env.PORT,
    },
    rabbitMq: {
        server: process.env.RABBITMQ_SERVER,
    },
    redis: {
        host: process.env.REDIS_SERVER,
    },
    jwt: {
        accessTokenKey: process.env.ACCESS_TOKEN_KEY,
        refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
        accessTokenAge: process.env.ACCESS_TOKEN_AGE,
    },
    postgres: {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    },
    nodeMailer: {
        user: process.env.SMTP_USER,
        host: process.env.SMTP_HOST,
        password: process.env.PGPASSWORD,
        port: process.env.SMTP_PORT,
    }
};

module.exports = config;
