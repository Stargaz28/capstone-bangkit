const { signin, signup, getUserProfile } = require('./handlers/authHandlers');

const routes = [
    {
        method: 'POST',
        path: '/signin',
        handler: signin,
    },
    {
        method: 'POST',
        path: '/signup',
        handler: signup,
    },
    {
        method: 'GET',
        path: '/profile/{userId}', // Correct the parameter name
        handler: getUserProfile,
    }
];

module.exports = routes;
