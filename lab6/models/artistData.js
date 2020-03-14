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


function signup(email, password){
    return db.query("INSERT INTO accounts (email, password) VALUES ('" + email + "', '" + password + "')");
}

function authenticate(email, password){
    return db.query("SELECT * FROM accounts WHERE email = '" + email + "' AND password = '" + password + "';");

    //maybe move savelogin content into here??
}

function savelogin(accountId){
    let date = new Date();

    let str = date.toUTCString();

    //insert/replace login info (this should be called when user successfully logs in).
    return db.query("INSERT INTO logins (id, lastlogin) VALUES ('" + accountId + "', '" + str + "') "
        + "ON CONFLICT (id) DO NOTHING;"); //overwrites duplicates
}


function checkLogin(accountId){
    return db.query("SELECT * FROM logins WHERE id = '" + accountId + "';");
}


function logout(accountId){
    return db.query("DELETE FROM logins WHERE id = '" + accountId + "';");
}


module.exports = {
    getall : getAllArtists,
    addArtist : addArtist,
    deleteArtist: deleteArtist,
    search: search,
    signup: signup,
    authenticate: authenticate,
    login: savelogin,
    checkLogin: checkLogin,
    logout: logout
}