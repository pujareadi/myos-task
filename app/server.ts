import * as http from 'http';
import {app} from './app';
import config from './config';

const server: http.Server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log('server started', process.env.PORT);
});
