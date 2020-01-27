const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect to db
connectDB();

//Test api endpoint
app.get('/', (req, res) => {
  res.send('API is running');
});
//middleware
//setup the middlware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParse());
//Our Defined Route
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
