const dbConfig = require('./config/db.json');
var mysql = require('mysql')
// var db = mysql.createConnection(dbConfig)
var pool = mysql.createPool(dbConfig)



pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if (connection) connection.release()

    return
})
module.exports = pool
// module.exports = db