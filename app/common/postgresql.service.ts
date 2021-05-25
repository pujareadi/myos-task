import {Pool} from 'pg';
import config from '../config'

const pool = new Pool({
  user: config.POSTGRES_DB_CONFIG.user,
  host: config.POSTGRES_DB_CONFIG.host,
  database: config.POSTGRES_DB_CONFIG.database,
  password: config.POSTGRES_DB_CONFIG.password,
  port: Number(config.POSTGRES_DB_CONFIG.port), 
});


pool.on('error', (err, client) => {
  console.error('Error: ', err);
});


export function queryPromise(text: string, values?: any) {
  return new Promise((resolve, reject) => {
    pool.query(text, values, (err, results) => {
      if (err) {
        console.log('error in the code');
        console.log(err);
        return reject(err);
      }
      return resolve(results.rows || []);
    });

  });
};