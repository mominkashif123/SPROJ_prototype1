// backend/server.js
const mongoose = require('mongoose');
const app = require('./app');

const PORT = 4000;
const MONGO_URI = 'mongodb+srv://mominkashif81:m6HB0AIaJC63lKtg@sproj.wxpmc.mongodb.net/?retryWrites=true&w=majority&appName=Sproj';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('MongoDB connection error:', error));
