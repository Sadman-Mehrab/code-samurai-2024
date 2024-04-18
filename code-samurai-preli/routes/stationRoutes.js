const express = require('express');
const { createStation, getStations, getAllTrains } = require('../controllers/stationController');

const router = express.Router();

router.post('/', createStation);

router.get('/', getStations);

router.get('/:id/trains', getAllTrains);







module.exports = router;