const express = require('express');

const router = express.Router();

const artistController = require('../controllers/artistController');

router.get('/', artistController.getAllArtists);

//router.get('/artists/add', artistController.peopleAddForm);
//router.get('/artists/:id', artistController.getPeople);
//router.post('/artists/add', artistController.peopleAdd)

module.exports = router;
