const { Pool } = require('pg');

// DB情報をもったプールを生成
const pool = new Pool({
    host: 'localhost',
    database: 'postgres',
    port: 5432,
    user: 'postgres',
    password: '0978781',
});

module.exports = pool;