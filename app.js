const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pg = require('pg');
const date = require("./public/js/date.js");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  db.connect();

app.get("/", function(req, res){
        res.render('home');
});

app.get("/compose", function(req, res){
    res.render('compose');
});

app.get("/posts", async function(req, res){
    let results = await db.query('SELECT * FROM facts');
    let foundFacts = results.rows;
    foundFacts
        ? res.render('posts', {factContent : foundFacts})
        : console.log('Try Again')
});

app.get("/:id", async function(req, res){
    const day = date.getDate();

    let results = await db.query('SELECT name, content FROM facts WHERE id = $1', [req.params.id]);
    results
        ? res.render('single', {
            day : day,
            title : results.rows[0].name,
            content : results.rows[0].content
        })
        : console.error('Please Try Again');
});

app.post("/compose", async (req, res) => {

    let newFact = await db.query(
        "INSERT INTO facts (name, content) VALUES ($1, $2)", 
        [req.body.tag, req.body.fact]
    )

    newFact
        ? res.redirect('/posts') 
        : console.log('error') 
    
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});

