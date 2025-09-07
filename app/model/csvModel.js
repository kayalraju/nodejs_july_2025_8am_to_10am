const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const csvSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true }
});

const CsvModel = mongoose.model('Csv', csvSchema);

module.exports = CsvModel;
