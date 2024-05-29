const { signin, signup, signout, getUserProfile } = require('./handlers/handler');
const { getHistory, getHistoryDetailsId } = require('./handlers/FetchHistoryHandler');

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
    },
    {
        method: 'GET',
        path: '/history',
        handler: getHistory,
        options: {
            auth: 'session'
        }
    },
    {
        method: 'GET',
        path: '/history/{id}',
        handler: getHistoryDetailsId,
        options: {
            auth: 'session'
        }
    }
];

module.exports = routes;
