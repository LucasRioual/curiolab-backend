const mongoose = require('mongoose');

const stuffSchema = mongoose.Schema({
  titre: { type: String, required: true },
  sousTitre: { type: String, required: true },
  description: { type: String, required: true },
  prix: { type: Number, required: true },
  //listImage: { type: Array, required: true },
  difficulte: { type: Number, required: true },
});

module.exports = mongoose.model('Stuff', stuffSchema);