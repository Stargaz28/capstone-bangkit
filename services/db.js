const mysql = require('mysql2/promise');
const { dbConfig } = require('./db-config');

const pool = mysql.createPool(dbConfig);

const query = async (sql, params) => {
    const [results] = await pool.query(sql, params);
    return results;
};

const getUserProfile = async (userId) => { // Correct the parameter name
    const sql = 'SELECT * FROM users WHERE id = ?';
    const params = [userId];
    const results = await query(sql, params);
    return results[0];
};

module.exports = { query, getUserProfile };
