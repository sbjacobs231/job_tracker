const fs = require("fs-extra");
const path = require("path");
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

// Read SQL file
const schemaPath = path.join(__dirname, "schema.sql");
const schemaSQL = fs.readFileSync(schemaPath, "utf-8");

// SQL Statements
const sqlStatements = schemaSQL.split(";").map(statement => statement.trim()).filter(statement => statement.length > 0);

// Create SQL connection
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    // database: process.env.MYSQL_DB,
    waitForConnections: true,
    multipleStatements: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Function for executing one sql statement
const executeSQL = (connection, statement) => {
    return new Promise((resolve, reject) => {
        connection.query(statement, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Connect to SQL server
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to database: ", err);
        return;
    }

    console.log("Connected to the database");

    // Execute each SQL statement
    let promise = Promise.resolve();
    sqlStatements.forEach(statement => {
        promise = promise.then(() => {
            return executeSQL(connection, statement);
        }).then(() => {
            console.log("SQL statement executed successfully: ", statement);
        }).catch((err) => {
            console.error("Error executing SQL statement: ", statement);
            throw err;
        });
    });

    promise.then(() => {
        connection.release();
        console.log("SQL schema executed successfully");
    }).catch(() => {
        connection.release();
        console.error("Error executing schema");
    }).finally(() => {
        pool.end();
    });
});