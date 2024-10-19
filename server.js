// import our dependancies
const express = require("express")
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv')

// configure environment variables
dotenv.config();

// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})



// test the connection
db.connect((err) => {
    // connection is not successful
if (err)
    return console.log("Error connecting to the database", err)

    // connection is successful
    console.log("Successfully connected to MySQL: ", db.threadId)
})



// retrieve all patients
app.get('', (req, res) => {
    const getPatients = "SELECT * FROM patients"
    db.query(getPatients, (err, data) => {
        // if I have an error
        if(err) {
            return res.status(400).send("Failed to get patients", err)
    }

        res.status(200).send(data)
    })
})


// GET endpoint to retrieve all providers
app.get('', (req, res) => {
    const getProviders = "SELECT * FROM providers"
    db.query(getProviders, (err, data) => {
// if I have an error
if(err) {
    return res.status(400).send("Failed to get providers", err)
}

res.status(200).send(data)
})
})

