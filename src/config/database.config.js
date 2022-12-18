import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { HOST_PG, PORT_PG, USER_PG, PASS_PG, DB_PG } = process.env;

const client = {
  development: {
    username: USER_PG,
    password: PASS_PG,
    database: DB_PG,
    host: HOST_PG,
    dialect: 'postgres'
  },
  test: {
    username: USER_PG,
    password: PASS_PG,
    database: DB_PG,
    host: HOST_PG,
    dialect: 'postgres'
  },
  production: {
    username: USER_PG,
    password: PASS_PG,
    database: DB_PG,
    host: HOST_PG,
    dialect: 'postgres'
  }
}

export default client