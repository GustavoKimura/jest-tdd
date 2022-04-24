require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

module.exports = {
    host: 'localhost',
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dialect: process.env.DATABASE_DIALECT || 'mysql',
    storage: './__tests__/database.sqlite',
    operatorsAliases: false,
    logging: false,

    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
};