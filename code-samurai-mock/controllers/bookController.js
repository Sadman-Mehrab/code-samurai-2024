const Book = require('../models/bookModel');
const mongoose = require('mongoose');


const getBooks = async (req, res) => {
    const books = await Book.find({}).sort({ createdAt: -1 });

    res.status(200).json({ "books": books });
}


const getBook = async (req, res) => {

    const { id } = req.params;

    const book = await Book.findOne({id: id});

    if (!book) {
        return res.status(404).json({ message: `book with id: ${id} was not found` });
    }

    res.status(200).json(book);
}



const createBook = async (req, res) => {
    const { id, title, author, genre, price } = req.body;

    try {
        const book = await Book.create({ id, title, author, genre, price });
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const deleteBook = async (req, res) => {
    const { id } = req.params;

    const book = await Book.findOneAndDelete({ id: id });

    if (!book) {
        return res.status(404).json({ message: `book with id: ${id} was not found` });
    }

    res.status(200).json(book);
}


const updateBook = async (req, res) => {
    const { id } = req.params;


    const book = await Book.findOneAndUpdate({ id: id }, { ...req.body }, { new: true });

    if (!book) {
        return res.status(404).json({ message: `book with id: ${id} was not found` });
    }


    res.status(200).json(book);


}

module.exports = { createBook, getBook, getBooks, deleteBook, updateBook }