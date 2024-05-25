const db = require('../services/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



//sign uo
async function signup (request, h) {
    const { email, username, password } = request.payload;
    console.log(`Senders: ${username}, ${password}`);

    const hashPassword = await bcrypt.hash(password, 10);

    try{
        await db.query('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, hashPassword]);
        const response = h.response({
            status: 'success',
            message: 'User Registered Successfully'
        });
        response.code(201);
        return response;
    }
    catch(error){
        const response = h.response({
            status: 'fail',
            message: error.message
        });
        response.code(500);
        return response;
    }
};

// sign in
async function signin (request, h) {
    const { username , password } = request.payload;
    
    try{
        console.log('Username, password: ', username, password);
        
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?',[username]);
        console.log('Rows:', JSON.stringify(rows));

        if(rows.length === 0){
            const response = h.response({
                status: 'fail',
                message: 'User not found'
            });
            response.code(404);
            return response;
        }
        const userrr = rows[0];

        // Check pw:
        const isValid = await bcrypt.compare(password, userrr.password);
        console.log(`User: ${userrr}`)
        if(!isValid){
            const response = h.response({
                status: 'fail',
                message: 'Invalid Password'
            });
            response.code(401);
            return response;
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return h.response({ status: 'success', token }).code(200);
    }
    catch(error){
        const response = h.response({
            status: 'fail',
            message: error.message
        });
        response.code(500);
        return response;
    }
};


module.exports = {signin, signup}