// Express.js Setup
const express = require('express');
const app = express();
const path = require('path');

// Handlebars (or other template engine) Setup
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('home', {
    courses: [
      {
        id: 1,
        title: 'Introduction to Programming',
        category: 'Programming',
        thumbnail: 'course1.jpg',
        duration: '2h 30m',
        free: true
      },
      {
        id: 2,
        title: 'Graphic Design Fundamentals',
        category: 'Design',
        thumbnail: 'course2.jpg',
        duration: '4h 15m',
        free: false
      },
      {
        id: 3,
        title: 'Starting a Small Business',
        category: 'Business',
        thumbnail: 'course3.jpg',
        duration: '3h 45m',
        free: true
      }
    ]
  });
});

app.get('/course/:id', (req, res) => {
  const course = {
    id: req.params.id,
    title: 'Introduction to Programming',
    category: 'Programming',
    thumbnail: 'course1.jpg',
    duration: '2h 30m',
    free: true,
    lessons: [
      {
        id: 1,
        title: 'Lesson 1: Introduction',
        duration: '30m'
      },
      {
        id: 2,
        title: 'Lesson 2: Variables and Data Types',
        duration: '45m'
      },
      {
        id: 3,
        title: 'Lesson 3: Control Flow',
        duration: '1h'
      },
      {
        id: 4,
        title: 'Lesson 4: Functions',
        duration: '15m'
      }
    ]
  };

  res.render('course', { course });
});

app.get('/dashboard', (req, res) => {
  const enrolledCourses = [
    {
      id: 1,
      title: 'Introduction to Programming',
      progress: 75
    },
    {
      id: 3,
      title: 'Starting a Small Business',
      progress: 100
    }
  ];

  res.render('dashboard', { enrolledCourses });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

FILENAME: package.json