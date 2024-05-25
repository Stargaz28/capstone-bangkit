const { signin, signup } = require('./handlers/authHandlers')
const routes = [
    {
        method: 'POST',
        path:'/signin',
        handler: signin,
    },

    {
        method: 'POST',
        path:'/signup',
        handler: signup,
    }
]

module.exports = routes