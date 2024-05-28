const { nanoid } = require('nanoid');
const db = require('../services/db');
const bcrypt = require('bcrypt');

// Sign Up
async function signup(request, h) {
    const { email, username, password } = request.payload;
    const id = nanoid(16);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (id, email, username, password) VALUES (?, ?, ?, ?)', [id, email, username, hashedPassword]);

        return h.response({
            status: 'success',
            message: 'User Registered Successfully',
        }).code(201);
    } catch (error) {
        return h.response({
            status: 'fail',
            message: error.message
        }).code(500);
    }
}

// Sign In
async function signin(request, h) {
    const { username, password } = request.payload;

    try {
        const results = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = results[0];

        if (!user) {
            return h.response({ status: 'fail', message: 'User not found' }).code(404);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return h.response({ status: 'fail', message: 'Invalid Password' }).code(401);
        }

        request.cookieAuth.set({ id: user.id });

        return h.response({ status: 'success', message: 'Authentication successful' }).code(200);
    } catch (error) {
        return h.response({
            status: 'fail',
            message: error.message
        }).code(500);
    }
}

// Sign Out
async function signout(request, h) {
    request.cookieAuth.clear();
    return h.response({ status: 'success', message: 'Logged out successfully' }).code(200);
}

// Get User Profile
async function getUserProfile(request, h) {
    const userId = request.auth.credentials.user.id;

    try {
        const results = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        const user = results[0];

        if (!user) {
            return h.response({ status: 'fail', message: 'User not found' }).code(404);
        }

        return h.response({ status: 'success', user }).code(200);
    } catch (error) {
        return h.response({
            status: 'fail',
            message: error.message
        }).code(500);
    }
}

module.exports = { signin, signup, signout, getUserProfile };
