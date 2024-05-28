const { signin, signup, signout, getUserProfile } = require('./handlers/handler');

const routes = [
    {
        method: 'POST',
        path:'/signin',
        handler: signin,
        options: {
            auth: false  // Disable authentication for this route
        }
    },
    {
        method: 'POST',
        path:'/signup',
        handler: signup,
        options: {
            auth: false  // Disable authentication for this route
        }
    },
    {
        method: 'POST',
        path:'/signout',
        handler: signout,
    },
    {
        method: 'GET',
        path:'/profile',
        handler: getUserProfile,
        options: {
            auth: 'session'  // Require authentication for this route
        }
    }
];

module.exports = routes;
