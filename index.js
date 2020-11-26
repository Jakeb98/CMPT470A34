// Jakeb Puffer
// 301313164

const express = require("express");
const bodyParser = require("body-parser");
const db = require("mysql");

const app = express();

var rectsInDB = [];
var IDsInDB = new Map();
var displayOption = 0;

// local mysql server
// var con = db.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "rectangle"
// })

// remote mysql server
var con = db.createConnection({
    host: "10.138.0.5",
    user: "USER4",
    password: "testpass",
    database: "cmpt470"
})

con.connect((err) => {
    if (err) throw err;
    console.log("Connected to db!!");
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// initial fetch from db
app.get('/initialFetch', (req, response) => {

    con.query("SELECT * FROM Rectangle", (err, res) => {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            if (!IDsInDB.has(res[i].ID)) {
                IDsInDB.set(res[i].ID, '');
                rectsInDB.push({
                    ID: res[i].ID,
                    Name: res[i].Name,
                    Height: res[i].Height,
                    Width: res[i].Width,
                    Colour: res[i].Colour,
                    Opacity: res[i].Opacity
                });

            }
        }

        response.send(rectsInDB);
        
    });
    
})

// adding rect to db
app.post('/addRect', (req, resp) => {
    var atts = req.body;
    var queryString = `INSERT INTO Rectangle VALUES (${atts.ID}, "${atts.Name}", ${atts.Height}, ${atts.Width}, "${atts.Colour}", ${atts.Opacity});`;
    //query db
    con.query(queryString, (err, res) => {
        if (err) throw err;
        console.log(`Inserted ID: ${req.body.ID}`);
	resp.send("Done");
    })
    console.log(req.body.ID);
    
})

var results = {   
    ID: "",
    Name: "",
    Height: "",
    Width: "",
    Colour: "",
    Opacity: ""
    };

function getResult(res) {
    results.ID = res[0].ID;
    results.Name = res[0].Name;
    results.Height = res[0].Height;
    results.Width = res[0].Width;
    results.Colour = res[0].Colour;
    results.Opacity = res[0].Opacity;
    console.log(results);
}

// fetching rect from db
app.post('/prepResults', (req, resp) => {
    var atts = req.body;
    
    var queryString = `SELECT * FROM Rectangle WHERE ID = ${atts.ID};`;
    con.query(queryString, (err, res) => {
        if (err) throw err;
        console.log(`Fetched ID: ${atts.ID}`);

        getResult(res);
	resp.send("fetched");
    });
    
})

app.get('/fetchRect', (req, res) => {

    res.send(results);
})

app.post('/displayRect', (req, res) => {
    var atts = req.body;
    var queryString = `SELECT * FROM Rectangle WHERE ID = ${atts.ID};`;
    con.query(queryString, (err, result) => {
        if (err) throw err;

        res.send(result[0])
    });
})


// updating rect in db
app.post('/updateRect', (req, resp) => {
    var atts = req.body;
    var queryString = `UPDATE Rectangle SET Name = "${atts.Name}", Height = ${atts.Height}, Width = ${atts.Width}, Colour = "${atts.Colour}", Opacity = ${atts.Opacity} WHERE ID = ${atts.ID};`;
    con.query(queryString, (err, res) => {
        if (err) throw err;
        for (var i = 0; i < rectsInDB.length; i++) {
            if (atts.ID == rectsInDB[i].ID) {
                rectsInDB[i].Name = atts.Name;
                rectsInDB[i].Height = atts.Height;
                rectsInDB[i].Width = atts.Width;
                rectsInDB[i].Colour = atts.Colour;
                rectsInDB[i].Opacity = atts.Opacity;
                break;
            }
        }
	resp.send("Done");
    });

})

// deleting rect from db
app.post('/deleteRect', (req, resp) => {
    var atts = req.body;

    var queryString = `DELETE FROM Rectangle WHERE ID = ${atts.ID};`;

    con.query(queryString, (err, res) => {
        if (err) throw err;
        for (var i = 0; i < rectsInDB.length; i++) {
            if (atts.ID == rectsInDB[i].ID) {
                for (var j = i; j < rectsInDB.length - 1; j++) {
                    rectsInDB[j].ID = rectsInDB[j+1].ID
                    rectsInDB[j].Name = rectsInDB[j+1].Name;
                    rectsInDB[j].Height = rectsInDB[j+1].Height;
                    rectsInDB[j].Width = rectsInDB[j+1].Width;
                    rectsInDB[j].Colour = rectsInDB[j+1].Colour;
                    rectsInDB[j].Opacity = rectsInDB[j+1].Opacity;
                }
                rectsInDB.pop();
                IDsInDB.delete(parseInt(atts.ID));
                break;
            }
        }
       	resp.send("Done");
    });
})

app.use('/', express.static('.', {index: "Views/rectangle.html"}))

app.listen(3000, () => {console.log("listening to port 3000")});
