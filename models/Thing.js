const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  userId: { type: String, required: false },
  name: { type: String, required: false },
  manufacturer: { type: String, required: false },
  description: { type: String, required: false },
  mainPepper: { type: String, required: false },
  imageUrl: { type: String, required: false },
  heat: { type: Number, required: false },
  // likes: { type: Number, required: false },
  // dislikes: { type: Number, required: false },
  // userLiked: { type: String, required: false },
  // userDisliked: { type: String, required: false },
});

module.exports = mongoose.model('Thing', thingSchema);