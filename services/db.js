// services/db.js
const mysql = require('mysql2/promise');
const { dbConfig } = require('./db-config');

const pool = mysql.createPool(dbConfig);

const query = async (sql, params) => {
    const [results] = await pool.query(sql, params);
    console.log('Query results:', results); // Add this line to log the query results
    return results;
};

module.exports = { query };
