require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./db');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', userRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synced!');
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync the database:', err);
  });
