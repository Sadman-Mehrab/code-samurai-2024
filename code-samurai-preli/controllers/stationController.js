const Station = require('../models/stationModel');
const Train = require('../models/trainModel');
const mongoose = require('mongoose');


const createStation = async (req, res) => {

    const { station_id, station_name, longitude, latitude } = req.body;
    try {
        const station = await Station.create({ station_id, station_name, longitude, latitude });
        res.status(201).json(station);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



const getStations = async (req, res) => {

    const stations = await Station.find({}).sort({ station_id: 1 });
    return res.status(200).json({ "stations": stations });

}

const getAllTrains = async (req, res) => {
    const { id } = req.params;

    
    const trains = await Train.find({}).sort({ train_id: 1 })

    const trainsLength = trains.length;

    const responseTrains = [];

    for(let i=0;i<trainsLength;i++){
        const trainStops = trains[i]['stops'];
        const trainStopsLength = trainStops.length;

        for (let j=0;j<trainStopsLength;j++){
            if(trainStops[j]['station_id'] == id){
                responseTrains.push({
                    train_id: trains[i]['train_id'],
                    arrival_time: trainStops[j]['arrival_time'],
                    departure_time: trainStops[j]['departure_time']
                })
            }
        }


    }

    const finalResponse = {
        station_id: id,
        trains: responseTrains
    }

    return res.status(200).json(finalResponse);

}







module.exports = { createStation, getStations, getAllTrains }