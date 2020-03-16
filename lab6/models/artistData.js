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

function search(name) {
    return db.query("SELECT * FROM actors WHERE UPPER(name) LIKE UPPER('%" + name + "%');");
}

// function signup(username, password){
//     return db.query("INSERT INTO accounts (username, password) VALUES ('" + username + "', '" + password + "')");
// }

function authenticate(username, password){
    return db.query("SELECT * FROM accounts WHERE username = '" + username + "' AND password = '" + password + "';");
}


module.exports = {
    getall : getAllArtists,
    addArtist : addArtist,
    deleteArtist: deleteArtist,
    search: search,
    //signup: signup,
    authenticate: authenticate,
}