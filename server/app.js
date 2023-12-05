const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser')
const session = require('express-session');
const bodyParser = require('body-parser');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const knexConfig = require('./knexfile');

const port = process.env.port || 8080;
const db = knex(knexConfig);

const app = express();

const allowedOrigins = ["http://localhost:3000","http://localhost:3001"];

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);


//register page requests
app.post('/register', async (req, res) => {
  const { firstname, lastname, username, password } = req.query;
  knex('users')
    .select('id')
    .then(newUser => {
      const newUserData = {
        id: newUser.length+1,
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
      };
      knex('users')
      .insert(newUserData)
      .then(x => {
        knex('users')
        .select('*')
        .where('username', username)
        .then(user_row => {
          res.json(user_row)
        })
      })
      .catch((error) => {
        res.status(404).json({
          message: 'The POST failed. Err 404'
        })
      })
    })
});


//login page requests
app.get('/login', async (req, res) => {
  const { username, password } = req.query;
  if (username && password) {
    knex('users')
      .select('*')
      .where('username', username)
      .andWhere('password', password)
      .then(user_row => {
        if (user_row.length > 0) {
          req.session.userId = user_row[0].id;
          res.cookie('sessionID', req.sessionID, { httpOnly: true });
          res.json({ user: user_row, message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      })
      .catch(error => {
        console.error('error');
      })
  }
})

//manage page requests
app.get('/manage', async (req, res) => {
  const { userid } = req.query;
  knex('item')
    .select('*')
    .where('userid', userid)
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.post('/manage', async (req, res) => {
  console.log('Request Body:', req.body);
  const { userid, itemname, description, quantity } = req.body;

  const maxIdResult = await knex.raw('SELECT MAX(id) as maxId FROM item');
  const maxId = maxIdResult.rows[0].maxid || 0

  knex('item')
    .select('id')
    .then(newItem => {
      const newItemData = {
        id: maxId + 1,
        userid: userid,
        itemname: itemname,
        description: description,
        quantity: quantity,
      };
      knex('item')
        .insert(newItemData)
        .then(() => {
          knex('item')
            .select('*')
            .where('id', newItemData.id).first()
            .then((item_row) => {
              res.json(item_row);
            })
            .catch((error) => {
              console.error('Error selecting item from the database:', error);
              res.status(500).json({
                message: 'Internal Server Error',
                error: error.message,
              });
            });
        })
        .catch((error) => {
          console.error('Error inserting into the database:', error);
          res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
          });
        });
    })
    .catch((error) => {
      console.error('Error selecting id from the database:', error);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    });
});

app.delete('/manage/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  knex('item')
    .where('id', itemId)
    .del()
    .then(() => res.json({ message: 'Item deleted successfully' }))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});