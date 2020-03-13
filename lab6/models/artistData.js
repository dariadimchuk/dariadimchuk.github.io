let db = require('../db/db');

// function addPeople(e) {
//      db.query("Insert into people (name,about,url) VALUES ('" + e.name +"','"+ e.about + "','"+ e.url +"')");
// }

function getAllArtists() {
    return db.query('SELECT * FROM actors');
}


function addArtist(artist) {
    return db.query("INSERT INTO actors (name, description, avatar) VALUES ('" 
        + artist.name + "', '" 
        + artist.description + "', '" 
        + artist.avatar + "')");
}

// function getPeople(id) {
//     return db.query('Select * from people where id = ' + id);
// }

module.exports = {
    // add : addPeople,
    getall : getAllArtists,
    addArtist : addArtist,
    // getpeople: getPeople 
}