require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const walletRoutes = require('./routes/walletRoutes');
const stationRoutes = require('./routes/stationRoutes');
const trainRoutes = require('./routes/trainRoutes');


const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


app.use('/api/users', userRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/stations', stationRoutes); 
app.use('/api/trains', trainRoutes); 


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        mongoose.connection.db.dropDatabase();
        console.log(`Empty Database Initialized`);
    })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server Started on Port ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })





