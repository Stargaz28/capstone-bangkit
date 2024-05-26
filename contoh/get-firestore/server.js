const Hapi = require('@hapi/hapi');
const routes = require('./routes');

(async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
})();

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
