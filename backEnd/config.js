require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    postgresEndpoint: process.env.POSTGRES_ENDPOINT,
    postgresEndpointSsl: process.env.POSTGRES_SSL,
    jwtSecret: process.env.JWT_SECRET 
};