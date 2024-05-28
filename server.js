const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const HapiAuthCookie = require('@hapi/cookie');
const db = require('./services/db');
require('dotenv').config();

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register(HapiAuthCookie);

    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: 'sid',
            password: process.env.COOKIE_SECRET, // Ensure this is at least 32 characters long
            isSecure: false, // Should be set to true in production
            path: '/',
        },
        redirectTo: false,
        validate: async (request, session) => {
            try {
                const results = await db.query('SELECT * FROM users WHERE id = ?', [session.id]);
                const user = results[0];
                if (!user) {
                    return { isValid: false };
                }
                return { isValid: true, credentials: { user } };
            } catch (error) {
                return { isValid: false };
            }
        }
    });

    server.auth.default('session');

    server.route(routes);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
