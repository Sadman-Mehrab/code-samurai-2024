const Train = require('../models/trainModel');
const mongoose = require('mongoose');


const createTrain = async (req, res) => {

    const { train_id, train_name, capacity, stops } = req.body;
    try {
        const train = await Train.create({ train_id, train_name, capacity, stops });

        const trainStops = train.stops;
        const trainStopsLength = trainStops.length;
        let service_start = "";
        let service_end = "";

        for (let i = 0; i < trainStopsLength; i++) {
            if (!trainStops[i]['arrival_time']) service_start = trainStops[i]['departure_time'];
            if (!trainStops[i]['departure_time']) service_end = trainStops[i]['arrival_time'];
        }

        const responseTrain = {
            train_id: train.train_id,
            train_name: train.train_name,
            capacity: train.capacity,
            service_start: service_start,
            service_end: service_end,
            num_stations: trainStopsLength
        }


        res.status(201).json(responseTrain);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getTrains = async (req, res) => {

    const trains = await Train.find({}).sort({ train_id: 1 });
    return res.status(200).json({ "trains": trains });
    
}




module.exports = { createTrain, getTrains }