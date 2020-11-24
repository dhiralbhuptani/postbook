import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';

const postRoutes = require('./routes/posts.route');
const userRoutes = require('./routes/users.route');

const app = express();

const MONGO_URL = 'mongodb+srv://' + 
                  process.env.MONGO_ATLAS_USER + ':' + 
                  process.env.MONGO_ATLAS_PW + 
                  '@cluster0.4yubs.mongodb.net/' + 
                  process.env.MONGO_DB_NAME + 
                  '?retryWrites=true&w=majority';

mongoose.connect(MONGO_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,  
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => {
  console.log('Connected to MongoDB')
})
.catch((error) => {
  console.log('Connection failed', error);
});

// Body Parser middleware to handle POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// TODO: Uncomment for production
// app.use('/images', express.static(path.join('images')));
// TODO: Comment for production
app.use('/images', express.static(path.join(__dirname, '/images')));
// TODO: Uncomment for production (if single server deployment)
// app.use('/', express.static(path.join(__dirname, '/angular-app')));


// TODO: Comment for production (if single server deployment)
// Enable Cross Origin Resource Sharing (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// API routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
// TODO: Uncomment for production (if single server deployment)
// app.use((res) => {
//   res.sendFile(path.join(__dirname, 'angular-app', 'index.html'));
// });

module.exports = app;