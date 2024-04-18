require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');


const app = express();


app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


app.use('/api/books', bookRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        mongoose.connection.db.dropDatabase();
    })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Database Connected and Server Started on Port ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })





