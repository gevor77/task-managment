import http from 'http';
import { app } from './app.js';
import { openConnectionToDb } from './db.js';
import TaskController from './task/task.controller.js';

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, async () => {
  await openConnectionToDb();

  console.log(`The service has been started successfully on port ${port}!`);

  app.use('/api/task', TaskController.router);
  
  app._router.stack
    .filter(r => r.route)
    .map(r => {
      const method = Object.keys(r.route.methods)[0];
      const path = `http://localhost:${port}${r.route.path}`;
      const formatString = '\x1b[36m%s\x1b[0m\t\x1b[33m%s\x1b[0m';
      console.log(formatString, method, path);
    });
});
