let express = require('express');  
let app = express();
var http = require('http');
let bodyparser = require('body-parser');

const fs = require('fs');
const path = require('path');

//app.get('/', (req, res) => res.send('Hello World!'))  
app.listen(3000, () => console.log('Server ready')) //this is the port to listen to


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, "public")));


let id = 0;
let actors = [];


//custom middleware
app.use((req,res,next) => {
	req.me = 'Tim';
	next(); //move on to next. Needed because otherwise code will freeze here.
});


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "actors.html"));
});


app.get('/getall', (req, res) => {
	var json = JSON.stringify(actors);
	console.log(json);
	
	//res.send(json);
	
	res.setHeader('Content-Type', 'application/json');
    res.end(json);
});



app.post('/', (req, res) => {
	let name = req.body.name;
	let description = req.body.description;
	let avatarImg = req.body.avatar;

	id += 1;
	actors.push({id, name, description, avatarImg});
	
	//let str = "name: " + name + " " + "\ndescription: " + descr + "\nurl: " + avatar;
	//console.log(str);
	
	/*
	for(let i = 0; i < actors.length; i++){
		console.log("Actor " + i + ": " + actors[i].name);
	}
	*/
	
	res.sendStatus(204);
});



/*
fs.writeFile("/save/file", (req,res) => {
    console.log("The file was saved!");
});
*/