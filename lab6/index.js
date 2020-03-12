let express = require('express');
let app = express();
var http = require('http');
let bodyparser = require('body-parser');
let playerRoutes = require('./routes/artists');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');



app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );

app.set('view engine', 'hbs');

app.set('views', 'views');

// app.get('/', function (req,res) {
//     res.render('home', { pageTitle: 'Artist Directory', heading: 'Artist Directory'});
// });

app.use(playerRoutes);
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public")));


//app.listen(3000, () => console.log('Server ready')) //for local debug
app.listen(process.env.PORT || 3000, () => console.log('Server ready @ port 3000'))





// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "actors.html"));
// });


// /**
//  * Gets all actors from saved file.
//  */
// app.get('/getall', async function(req, res) {
//     try{
//         res.setHeader('Content-Type', 'application/json');

//         var actors = await getActorsFromFile(); //gets actors from json file
//         var json = JSON.stringify(actors);
//         res.setHeader('Content-Type', 'application/json');
//         res.end(json);
//     } catch(e){
//         res.end(e.message || e.toString());
//     }
// });


// /**
//  * Returns filtered list of actors that match the input search string.
//  */
// app.get('/search/:value', async function(req, res) {
//     try{
//         let name = req.params.value;

//         var actors = await getActorsFromFile();
//         var filteredActors = actors.filter(x => x.name.toLowerCase().includes(name));

//         var json = JSON.stringify(filteredActors);
//         res.setHeader('Content-Type', 'application/json');
//         res.end(json);
//     } catch(e){
//         res.end(e.message || e.toString());
//     }
// });


// /**
//  * Adds new actor.
//  */
// app.post('/add', async function(req, res) {
//     try{
//         let name = req.body.name;
//         let description = req.body.desc;
//         let avatarImg = req.body.url;

//         var id = generateId();

//         var actors = await getActorsFromFile();
//         actors.push({ id, name, description, avatarImg });

//         await saveActorsToFile(actors);
//         res.sendStatus(204);
//     } catch(e){
//         res.end(e.message || e.toString());
//     }
// });


// /**
//  * Deletes an actor.
//  */
// app.post('/delete', async function(req, res) {

//     try{
//         let id = req.body.idToDelete;

//         var actors = await getActorsFromFile();
//         actors = actors.filter(x => x.id != id);
//         await saveActorsToFile(actors);

//         res.sendStatus(204);
//     } catch(e){
//         res.end(e.message || e.toString());
//     }
// });


// /**
//  * Writes to actors.json file. Will replace entire file on save.
//  * @param actors
//  * @returns {Promise<void>}
//  */
// async function saveActorsToFile(actors){
//     await fs.writeFile(filePath, JSON.stringify(actors), function (err) {
//         if (err) return console.log(err);
//     });
// }


// /**
//  * Gets the actors array from json file. If doesn't exist, makes a new one.
//  * @returns {Promise<*>}
//  */
// async function getActorsFromFile(){
//     try {
//         await fs.promises.access(filePath); //check if exists

//         var raw = await fs.readFileSync(filePath);
//         var actors = JSON.parse(raw);
//         return actors;
//     } catch (error) {
//         await saveActorsToFile([]); //creates a new file & saves empty array
//         return [];
//     }
// }


// /**
//  * A unique Id made by using current date, and converting to seconds passed since 1970.
//  * @returns {number} - unique id
//  */
// function generateId(){
//     var d = new Date();
//     return Math.round(d / 1000);
// }



