let mod = require('../models/artistData');

exports.getAllArtists = function(req,res,next) {
    let artists = mod.getall();

    artists.then((data) => {
        res.render('home', { 
            artists: data.rows, 
            artistsCSS: true,
            pageTitle: 'Artist Directory', 
            heading: 'Artist Directory' 
        });
    });
}



exports.addArtist = function(req, res, next){
    var url = req.body.avatar;
    var na = req.body.name;
    var descr = req.body.description;

    var artist = {
        name: na,
        description: descr,
        avatar: url
    };
    
    let add = mod.addArtist(artist);

    if(add){
        add.then((data) => {
            console.log(data.rows);
    
            res.redirect(301, "/");
        });
    }
    
}

// exports.peopleAddForm = function(req,res,next) {
//     res.render('peopleadd' ,{formsCSS: true});
// }

// exports.getPeople = function(req,res,next) {
//     let id = req.params.id;
//     let People = mod.getpeople(id);
//     People.then( (data) => {
//         res.render('people', {people: data.rows[0], peopleCSS: true});
//     });
// }

// exports.peopleAdd = function(req,res,next) {
//    let p_name = req.body.name;
//    let p_about = req.body.about;
//    let p_imageURL = req.body.url;

//    let pOject = {
//       name: p_name,
//       about: p_about,
//       url: p_imageURL
//    }

//    mod.add(pOject);
//    res.redirect(301, '/peoples');
// }