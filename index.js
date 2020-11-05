const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const loginRouter = require('./controllers/login');

app.use(bodyParser.json());
app.use('/login', loginRouter);

app.listen(3001, () => {
  console.log('Authentication server online');
});