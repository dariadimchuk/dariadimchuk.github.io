let db = require('../db/db');

// function addPeople(e) {
//      db.query("Insert into people (name,about,url) VALUES ('" + e.name +"','"+ e.about + "','"+ e.url +"')");
// }

function getAllArtists() {
    return db.query('Select * from actors');
}

// function getPeople(id) {
//     return db.query('Select * from people where id = ' + id);
// }

module.exports = {
    // add : addPeople,
    getall : getAllArtists,
    // getpeople: getPeople 
}