const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connection');
const routes = require('./controllers');
const path = require('path');
const withAuth = require('./config/auth');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//  The session handling

const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files 

app.use(express.static(path.join(__dirname, 'public')));

// Use routes 

app.use(routes);

// Sync Sequelize models and start server

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
