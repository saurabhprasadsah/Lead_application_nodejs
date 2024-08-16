const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  emailId: { type: String, required: true },
  name: { type: String, required: true },
  number: { type: String, required: true },
  product: { type: String, enum: ['A', 'B', 'C'], required: true }
});

module.exports = mongoose.model('Lead', leadSchema);
