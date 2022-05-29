import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = Number(process.env.DB_PORT)

const dbCon = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
})

dbCon.connect(function (error) {
  if (error) throw error
  console.log('DB connected')
})

class DbConnection {
  public select = (query: {select: string; table: string; where?: string}) => {
    return new Promise((resolve, reject) => {
      var sql = `SELECT ${query.select} FROM ${query.table}`
      if (query.where) {
        sql += ` WHERE ${query.where}`
      }
      console.log(sql)
      dbCon.query(sql, (err, result, fields) => {
        if (err) {
          reject(new Error(err.message))
        }
        resolve(JSON.parse(JSON.stringify(result)))
      })
    })
  }

  public insert = (query: {table: string; values: string}) => {
    return new Promise((resolve, reject) => {
      var sql = `INSERT INTO ${query.table} VALUES ${query.values}`
      console.log(sql)
      dbCon.query(sql, (err, result, fields) => {
        if (err) {
          reject(new Error(err.message))
        }
        resolve(result)
      })
    })
  }

  public update = (query: {table: string; set: string; where: string}) => {
    return new Promise((resolve, reject) => {
      var sql = `UPDATE ${query.table} SET ${query.set} WHERE ${query.where}`
      console.log(sql)
      dbCon.query(sql, (err, result, fields) => {
        if (err) {
          reject(new Error(err.message))
        }
        resolve(result)
      })
    })
  }

  public delete = (query: {table: string; where: string}) => {
    return new Promise((resolve, reject) => {
      var sql = `DELETE FROM ${query.table} WHERE ${query.where}`
      console.log(sql)
      dbCon.query(sql, (err, result, fields) => {
        if (err) {
          reject(new Error(err.message))
        }
        resolve(result)
      })
    })
  }

  public dropTable = (query: {table: string}) => {
    return new Promise((resolve, reject) => {
      var sql = `DROP TABLE IF EXISTS ${query.table}`
      console.log(sql)
      dbCon.query(sql, (err, result, fields) => {
        if (err) {
          reject(new Error(err.message))
        }
        resolve(result)
      })
    })
  }

  public createTable = (query: {table: string; columns: string}) => {
    return new Promise((resolve, reject) => {
      var sql = `CREATE TABLE ${query.table} (${query.columns})`
      console.log(sql)
      dbCon.query(sql, (err, result, fields) => {
        if (err) {
          reject(new Error(err.message))
        }
        resolve(result)
      })
    })
  }

  public insertMultiple = (query: {
    table: string
    columns: string
    values: any
  }) => {
    return new Promise((resolve, reject) => {
      var sql = `INSERT INTO ${query.table} (${query.columns}) VALUES ?`
      console.log(sql)
      dbCon.query(sql, [query.values], (err, result, fields) => {
        if (err) {
          reject(new Error(err.message))
        }
        resolve(result)
      })
    })
  }

  public rawSql = (query: string) => {
    return new Promise((resolve, reject) => {
      console.log(query)
      dbCon.query(query, (err, result, fields) => {
        if (err) {
          reject(new Error(err.message))
        }
        resolve(result)
      })
    })
  }
}

const dbConnection = new DbConnection()
export default dbConnection
