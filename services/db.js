const mysql = require('mysql2/promise');
const {dbConfig} = require('./db-config');

const pool = mysql.createPool(dbConfig);

const query = async (sql, params) => {
    const [results] = await pool.query(sql, params);
    return results;
};

module.exports =  {query} ;