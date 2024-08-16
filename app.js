const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const leadRoutes = require('./routes/leadRoutes');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/leads', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use('/leads', leadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
