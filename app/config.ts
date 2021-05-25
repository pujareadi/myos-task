export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  POSTGRES_DB_CONFIG : {
    user: process.env.PG_USER, // env var: PGUSER
    database: process.env.PG_DB, // env var: PGDATABASE
    password: '', // env var: PGPASSWORD
    host: process.env.PG_HOST, // Server hosting the postgres database
    port: process.env.PG_PORT, // env var: PGPORT
    max: process.env.PG_MAX, // max number of clients in the pool
    idleTimeoutMillis: process.env.PG_IDLE_TIMEOUT_MILLIS,
  }
}
