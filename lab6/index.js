let express = require('express');
let app = express();
var http = require('http');
let bodyparser = require('body-parser');
let routes = require('./routes/artists');
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


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.listen(process.env.PORT || 3000);
