const db = require('../services/db');




//sign uo
async function signup (request, h) {
    const { email, username, password } = request.payload;
    console.log(`Senders: ${username}, ${password}`);


    try{
        await db.query('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, password]);
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
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?',[username]);

        if(rows.length === 0){
            const response = h.response({
                status: 'fail',
                message: 'User not found'
            });
            response.code(404);
            return response;
        }
        
        //retrieve pw:
        const pw = await db.query('SELECT password FROM users WHERE username = ?', [username]);
        const storedPW = pw[0].password
        if (password !== storedPW) {
            const response = h.response({
                status: 'fail',
                message: 'Invalid Password'
            });
            response.code(401);
            return response;
        }
        return h.response({ status: 'success', message: 'Authentication successful' }).code(200);
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
