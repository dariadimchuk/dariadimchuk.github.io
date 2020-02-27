let express = require('express');
let app = express();
var http = require('http');
let bodyparser = require('body-parser');

const fs = require('fs');
const path = require('path');


//app.listen(3000, () => console.log('Server ready')) //this is the port to listen to
app.listen(process.env.PORT || 3000);


app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public")));

let actors = [];


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "actors.html"));
});


app.get('/getall', (req, res) => {
    var json = JSON.stringify(actors);
    res.setHeader('Content-Type', 'application/json');
    res.end(json);
});


app.get('/search/:value', (req, res) => {
    let name = req.params.value;

    var filteredActors = actors.filter(x => x.name.toLowerCase().includes(name));

    var json = JSON.stringify(filteredActors);
    res.setHeader('Content-Type', 'application/json');
    res.end(json);
});


app.post('/add', (req, res) => {
    let name = req.body.name;
    let description = req.body.desc;
    let avatarImg = req.body.url;

    //save to "db"
    var id = generateId();
    actors.push({ id, name, description, avatarImg });

    res.sendStatus(204);
});


app.post('/delete', (req, res) => {
    let id = req.body.idToDelete;

    //save to "db"
    actors = actors.filter(x => x.id != id);

    res.sendStatus(204);
});


/**
 * A unique Id made by using current date, and converting to seconds passed since 1970.
 * @returns {number} - unique id
 */
function generateId(){
    var d = new Date();
    return Math.round(d / 1000);
}