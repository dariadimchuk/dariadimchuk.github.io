const express = require('express');

const router = express.Router();

const artistController = require('../controllers/artistController');
const authController = require('../controllers/loginController');

router.get('/', authController.loadPage)
router.post('/login', authController.login);

router.get('/logout', artistController.logout);
router.get('/home', artistController.getAllArtists);
router.post('/add', artistController.addArtist);
router.get('/delete/:id', artistController.deleteArtist);
router.post('/search', artistController.search);


module.exports = router;
