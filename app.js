const express = require('express');
const app = express();

const stuffRoutes = require('./routes/stuffRoute');

const mongoose = require('mongoose');
require('dotenv').config(); 

const uri = process.env.MONGO_URI;

async function connectMongoDB() {
  try {
    await mongoose.connect(uri)
    console.log('Connexion à MongoDB réussie !');
  } catch (error) {
    console.error('Connexion à MongoDB échouée !', error);
  }
}

connectMongoDB();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.get('/', (req, res) => {
    res.redirect('/test/');
  });
  
app.use(express.json());

app.use('/api/stuff', stuffRoutes);



module.exports = app;