const { Pool } = require('pg');
var conf = require('../config/default.json');

// DB情報をもったプールを生成
const pool = new Pool({
    host: conf.postgresql.host,
    database: conf.postgresql.database,
    port: Number(conf.postgresql.port),
    user: conf.postgresql.user,
    password: conf.postgresql.password,
});

module.exports = pool;