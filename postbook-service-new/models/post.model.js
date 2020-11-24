import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  postTitle: { 
    type: String, 
    required: true 
  },
  postContent: { 
    type: String,    
    required: true 
  },
  imagePath: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Post', postSchema);