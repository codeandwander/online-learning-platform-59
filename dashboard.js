// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faBook, faChartLine, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

// Custom components
import CourseCatalog from './components/CourseCatalog';
import CourseDetail from './components/CourseDetail';
import Dashboard from './components/Dashboard';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';

// Stylesheet
import './dashboard.css';

function App() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Fetch course data from a backend API or static data source
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    // Implement course data fetching logic
    const coursesData = [
      {
        id: 1,
        title: 'Introduction to Programming',
        category: 'Programming',
        thumbnail: 'programming-thumbnail.jpg',
        lessons: [
          { id: 1, title: 'Variables and Data Types', duration: '15 min' },
          { id: 2, title: 'Control Flow and Conditionals', duration: '20 min' },
          { id: 3, title: 'Functions and Modules', duration: '25 min' },
        ],
        totalDuration: '60 min',
        isFree: true,
      },
      {
        id: 2,
        title: 'Graphic Design Fundamentals',
        category: 'Design',
        thumbnail: 'design-thumbnail.jpg',
        lessons: [
          { id: 1, title: 'Color Theory', duration: '30 min' },
          { id: 2, title: 'Typography', duration: '25 min' },
          { id: 3, title: 'Composition and Layout', duration: '35 min' },
        ],
        totalDuration: '90 min',
        isFree: false,
      },
      {
        id: 3,
        title: 'Entrepreneurship Essentials',
        category: 'Business',
        thumbnail: 'business-thumbnail.jpg',
        lessons: [
          { id: 1, title: 'Idea Generation', duration: '40 min' },
          { id: 2, title: 'Market Research', duration: '30 min' },
          { id: 3, title: 'Business Planning', duration: '45 min' },
        ],
        totalDuration: '115 min',
        isFree: true,
      },
    ];
    setCourses(coursesData);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses">
                  <FontAwesomeIcon icon={faBook} />
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <FontAwesomeIcon icon={faChartLine} />
                  Dashboard
                </Link>
              </li>
              <li>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme