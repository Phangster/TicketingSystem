const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/api/users');

const port = process.env.PORT || 5000;

// Config DB
const db = require('./config/keys').dev.mongoURI;

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Connect to MongoDB via Mongoose
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/users', users);

app.listen(port, () => console.log(`Server running on port ${port}`));