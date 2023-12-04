const express = require('express');
const app = express();
const port = process.env.port || 8080;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const knexConfig = require('./knexfile');
const db = knex(knexConfig);

const bodyParser = require('body-parser');

const cors = require("cors");
const allowedOrigins = ["http://localhost:3000","http://localhost:3001"];

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});