export default () => ({
    port: parseInt(process.env.API_PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        user: process.env.DATABASE_USERNAME,
        password: parseInt(process.env.DATABASE_PASSWORD, 10)
    }
});