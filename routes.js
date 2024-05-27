const {getHistory, getHistoryDetailsId} = require('./handler')

const routes = [
    {
        method: 'GET',
        path: '/history',
        handler: getHistory,
    },

    {
        method: 'GET',
        path: '/history/{id}',
        handler: getHistoryDetailsId,
    },
]
module.exports = routes