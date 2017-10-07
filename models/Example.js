// Requires
const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      error = require('../helpers/error');

// Create Schema
const ExampleSchema  = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Hash password before saving to database
ExampleSchema.pre('save', next => {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) next(err);

    this.password = hash;
    
    next();
  });
});

// Authenticate input against database documents
ExampleSchema.static.authenticate = (email, password, next) => {
  Example.findOne({ email: email }).exec((err, example) => {
    if (err) next(err);
    else if (!example) next(error(401, 'Example not found'));

    bcrypt.compare(password, example.password, (err, result) => {
      if (result === true) next(null, example);
      else next();
    });
  });
};

// Save to database
const Example = mongoose.model('Example', ExampleSchema);

// Export as model
module.exports = Example;





// ***************************************************************** //

// CONNECT TO MONGODB AND ADD SESSIONS (app.js)
const mongoose = require('mongoose'),
      session = require('express-sessions'),
      MongoStore = require('connect-mongo')(session);

// Connect to database
mongoose.connect('mongodb://localhost:27017/example');
const db = mongoose.connection;
// Handle error
db.on('error', console.error.bind(console, 'Connection Error:'));
// Log 'connected' once when connection is open
db.once('open', () => console.log('Connected to the database'));

// Use sessions for tracking logins
app.use(session({
  secret: 'secret goes here',  // https://github.com/expressjs/session#compatible-session-stores
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// Create current local
app.use((req, res, next) => {
  res.locals.currentExample = req.session.exampleId;
  next();
});





// ROUTES (./routes/example.js)
const Example = require('../models/Example'),
      error = require('../helpers/error');

// Register example and store it in the database
router.post('/example', (req, res, next) => {
  // Check if all fields were filled
  if (req.body.name &&
      req.body.age &&
      req.body.email &&
      req.body.password &&
      req.body.confirmPassword) {
    // Check if passwords match
    if (req.body.password !== req.body.confirmPassword) next(error(400, 'Passwords don\'t match'));
    
    // Store object with requested data
    let exampleData = {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password
    }

    // Create document with stored data and redirect
    Example.create(exampleData, (err, example) => {
      if (err) next(err);
      else {
        req.session.exampleId = example._id;
        res.redirect('/');
      }
    });
  }
  else next(error(400, 'All fields are required')); // Send error to notify all fields are required
});

// Authenticate login
route.post('/login', (req, res, next) => {
  let email = req.body.email,
      password = req.body.password;

  // Check for filled email and password fields
  if (email && password) {
    Example.authenticate(email, password, (err, example) => {
      // Check if example exists
      if (err || !example) next(error(401, 'Wrong username or password')); // Send error that example doesn't exist
      else {
        // Setting example to session and redirecting
        req.session.exampleId = example._id;
        return res.redirect('/');
      }
    });
  }
  else next(401, 'Email and Password are required'); // Send error requiring both fields
});

// Show a profile with the data
router.get('/profile', (req, res, next) => {
  let exampleSession = req.session.exampleId;

  // Check if there is a current session. If there isn't, send error for unauthorized access.
  if (!exampleSession) next(403, 'You are not authorized to view this page.');

  // Find the session and show the profile
  Example.findById(exampleSession)
      .exec((err, example) => {
        if (err) next(err);
        else return res.render('profile', { title: 'Profile', name: example.name, age: example.age });
      });
});

// Logout and delete session
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) next(err);
      else res.redirect('/');
    });
  }
});