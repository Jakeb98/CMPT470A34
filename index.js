const express = require("express");
const bodyParser = require("body-parser");
const db = require("mysql");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// adding rect to db
app.post('/addRect', (req, res) => {
    var atts = req.body;
    // var query = `INSERT INTO TABLE Rectangles VALUES (${atts.ID}, ${atts.Name}, ${atts.Height}, ${atts.Width}, ${atts.Colour}, ${atts.Opacity})`;
    //query db
    console.log("bleh");
    console.log(req.body.ID);
})

// fetching rect from db
app.post('/fetchRect', (req, res) => {
    var atts = req.body;
    //var query = `SELECT * FROM Rectangles WHERE ID = ${atts.ID}`;
    var temp = {   
    Colour: "#800080",
    Height: "1",
    ID: `${req.body.ID}`,
    Name: "bep",
    Opacity: "90",
    Width: "1"};

    res.send(temp);
})

// updating rect in db
app.post('/updateRect', (req, res) => {
    var atts = req.body;
    // var query = `UPDATE Rectangles SET Name = ${atts.Name}, Height = ${atts.Height}, Width = ${atts.Width}, Colour = ${atts.Colour}, Opacity = ${atts.Opacity} WHERE ID = ${atts.ID}`;
    

})

// deleting rect from db
app.post('/deleteRect', (req, res) => {
    var atts = req.body;
    // var query = `DELETE FROM Rectangles WHERE ID = ${atts.ID}`;

})

app.use('/', express.static('.', {index: "Views/rectangle.html"}))

app.listen(3000, () => {console.log("listening to port 3000")});
