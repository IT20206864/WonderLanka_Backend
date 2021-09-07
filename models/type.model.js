const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const typeSchema = new Schema({
  vtype: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const Type = mongoose.model('Type', typeSchema);

module.exports = Type;