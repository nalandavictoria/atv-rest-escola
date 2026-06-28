const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'escola',
    password: 'eliza310314',
    port: 5432
});

module.exports = pool;