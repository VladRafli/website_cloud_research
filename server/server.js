/* No Database Package! */

/* Packages */

// Express
const express = require('express');
// MySQL
const mysql = require('mysql');
// Cors
const cors = require('cors');
// Morgan
const morgan = require('morgan');
// Dotenv
require('dotenv').config();

/* Variables */

const PORT = 5000 || process.env.PORT;

/* Middlewares */

// Run Express App
const app = express();
// Run Express Static Page
app.use(express.static(__dirname));
// Database
const db = mysql.createConnection({
    host: 'host.docker.internal',
    user: 'root',
    password: '',
    database: 'database_research',
});
db.connect(err => {
    if (err) throw err;
    console.log('Database is successfully connected!');
});
// Cors
app.use(cors());
// Morgan Logger
app.use(morgan('tiny'));
// Express Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Routes */

// Check if Server is On via Get on Route /
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/" + "Pages/index.html");
});

// Get Request
app.get('/get', (req, res) => {
    let sql = 'SELECT * FROM blog_posts';
    db.query(sql, (err, result) => {
        if (err) {res.status(404).json({ Error: err })};
        res.status(200).json({
            message: 'Data succesfully recieved',
            result: result
        })
    });
});
// Post Request
app.post('/post', (req, res) => {
    const {post_image, post_title, post_body, post_author} = req.body
    var pad = function(num) { return ('00'+num).slice(-2) };
    let date = new Date();
    date = date.getUTCFullYear()    + '-' +
        pad(date.getUTCMonth() + 1) + '-' +
        pad(date.getUTCDate())      + ' ' +
        pad(date.getUTCHours())     + ':' +
        pad(date.getUTCMinutes())   + ':' +
        pad(date.getUTCSeconds());
    image_link = encodeURIComponent(post_image)
    

    let sql = `INSERT INTO blog_posts (post_image, post_title, post_body, post_author, post_date_posted) VALUES ('${image_link}', '${post_title}', '${post_body}', '${post_author}', '${date}')`
    db.query(sql, [req.body], (err, result) => {
        if (err) {res.status(400).json({ Error: err, Link: image_link })};
        res.status(201).json({
            message: 'Data succesfully posted',
            result: result
        });
    });
});

/* Launch App on Port 5000 */

app.listen(PORT, console.log(`Server is starting at ${PORT}`));