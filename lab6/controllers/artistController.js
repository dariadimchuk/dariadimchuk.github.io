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

    add.then((data) => {
        res.redirect(301, "/home");
    });
    
}


exports.deleteArtist = function(req, res, next){
    let id = req.params.id;
    let del = mod.deleteArtist(id);

    if(del){
        del.then((data) => {
            res.redirect(301, "/home");
        });
    }
}


exports.search = function(req, res, next){
    let input = req.body.name;

    let query = mod.search(input);
    if(query){
        query.then((data) => {
            //wipes out the input search text, which is confusing for user!!!!!!!
            res.render('home', { 
                artists: data.rows, 
                artistsCSS: true,
                pageTitle: 'Artist Directory', 
                heading: 'Artist Directory' 
            });
        });
    }
}
