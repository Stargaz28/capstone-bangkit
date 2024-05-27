const db = require('../services/db');
const bcrypt = require('bcrypt');

// sign up
// authhandler.js (within signup function)
async function signup(request, h) {
    const { email, username, password } = request.payload;
    console.log(`Senders: ${username}, ${password}`);

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const result = await db.query('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, hashedPassword]);
        const userId = result.insertId; // Get the inserted user ID
        const response = h.response({
            status: 'success',
            message: 'User Registered Successfully',
            userId: userId // Include userId in the response
        });
        response.code(201);
        return response;
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: error.message
        });
        response.code(500);
        return response;
    }
}


// sign in
async function signin(request, h) {
    const { username, password } = request.payload;

    try {
        const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (!user) {
            const response = h.response({
                status: 'fail',
                message: 'User not found'
            });
            response.code(404);
            return response;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            const response = h.response({
                status: 'fail',
                message: 'Invalid Password'
            });
            response.code(401);
            return response;
        }

        return h.response({ status: 'success', message: 'Authentication successful' }).code(200);
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: error.message
        });
        response.code(500);
        return response;
    }
}

const getUserProfile = async (request, h) => {
    const userId = request.params.userId; // Correct the parameter name
    try {
        const user = await db.getUserProfile(userId);
        if (!user) {
            return h.response({ status: 'fail', message: 'User not found' }).code(404);
        }
        return h.response(user).code(200);
    } catch (error) {
        return h.response({ status: 'fail', message: error.message }).code(500);
    }
};

module.exports = { signin, signup, getUserProfile };
