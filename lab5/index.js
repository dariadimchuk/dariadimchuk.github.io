let express = require('express');  
let app = express();
let bodyparser = require('body-parser');

const fs = require('fs');
const path = require('path');

//app.get('/', (req, res) => res.send('Hello World!'))  
app.listen(3000, () => console.log('Server ready')) //this is the port to listen to



app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, "public")));



//custom middleware
app.use((req,res,next) => {
	req.me = 'Tim';
	next(); //move on to next. Needed because otherwise code will freeze here.
});


//calls our custom middleware
// app.get('/foo', (req, res) => {
// 	res.send(????);
// });




app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "actors.html"));
});



app.post('/message', (req, res) => {
	let info = req.body.info;
	console.log(info);
	res.send(info);
});



/*
fs.writeFile("/save/file", (req,res) => {
    console.log("The file was saved!");
});
*/