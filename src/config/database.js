const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '.caua2023.',
    database: 'biblioteca_pessoal',
    port: 3306
});

module.exports = pool;