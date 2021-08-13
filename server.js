const getConnection = require('./connection');
const express = require('express');
const app = express();

const { getQuery } = require('./orm');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());