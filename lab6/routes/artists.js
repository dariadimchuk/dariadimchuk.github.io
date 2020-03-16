const express = require('express');

const router = express.Router();

const artistController = require('../controllers/artistController');

router.get('/', artistController.loadPage)
router.get('/home', artistController.getAllArtists);
router.post('/add', artistController.addArtist);
router.get('/delete/:id', artistController.deleteArtist);
router.post('/search', artistController.search);

router.post('/login', artistController.login);
router.post('/logout', artistController.logout);

module.exports = router;
