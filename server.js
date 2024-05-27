const Hapi = require('@hapi/hapi');
const routes = require('./routes')

const init = async ()=> {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server listening at: ${server.info.uri}`);
};

init();