let db = require('../db/db');

function getAllArtists() {
    return db.query('SELECT * FROM actors');
}

function addArtist(artist) {
    return db.query("INSERT INTO actors (name, description, avatar) VALUES ('" 
        + artist.name + "', '" 
        + artist.description + "', '" 
        + artist.avatar + "')");
}

function deleteArtist(id){
    return db.query("DELETE FROM actors WHERE id = '" + id + "';");
}

// function getPeople(id) {
//     return db.query('Select * from people where id = ' + id);
// }

module.exports = {
    getall : getAllArtists,
    addArtist : addArtist,
    deleteArtist: deleteArtist,
}