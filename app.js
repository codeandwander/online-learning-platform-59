const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/online-learning', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import routes
const courseRoutes = require('./routes/courses');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

// Use routes
app.use('/courses', courseRoutes);
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Something went wrong' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

FILENAME: routes/courses.js