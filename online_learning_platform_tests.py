import unittest
from unittest.mock import patch
from online_learning_platform.models import Course, Lesson, User, Enrollment
from online_learning_platform.views import CourseListView, CourseDetailView, DashboardView

class TestCourseModel(unittest.TestCase):
    def test_course_creation(self):
        course = Course(
            title="Introduction to Python",
            description="Learn the fundamentals of Python programming",
            category="Programming",
            is_premium=False
        )
        self.assertEqual(course.title, "Introduction to Python")
        self.assertEqual(course.description, "Learn the fundamentals of Python programming")
        self.assertEqual(course.category, "Programming")
        self.assertFalse(course.is_premium)

    def test_add_lesson(self):
        course = Course(
            title="Introduction to Python",
            description="Learn the fundamentals of Python programming",
            category="Programming",
            is_premium=False
        )
        lesson = Lesson(
            title="Variables and Data Types",
            duration=30,
            course=course
        )
        course.add_lesson(lesson)
        self.assertEqual(len(course.lessons), 1)
        self.assertEqual(course.lessons[0], lesson)

class TestUserModel(unittest.TestCase):
    def test_user_creation(self):
        user = User(
            username="johndoe",
            email="johndoe@example.com",
            password="password123"
        )
        self.assertEqual(user.username, "johndoe")
        self.assertEqual(user.email, "johndoe@example.com")
        self.assertEqual(user.password, "password123")

    def test_enroll_in_course(self):
        user = User(
            username="johndoe",
            email="johndoe@example.com",
            password="password123"
        )
        course = Course(
            title="Introduction to Python",
            description="Learn the fundamentals of Python programming",
            category="Programming",
            is_premium=False
        )
        user.enroll_in_course(course)
        self.assertEqual(len(user.enrolled_courses), 1)
        self.assertEqual(user.enrolled_courses[0], course)

class TestEnrollmentModel(unittest.TestCase):
    def test_enrollment_creation(self):
        user = User(
            username="johndoe",
            email="johndoe@example.com",
            password="password123"
        )
        course = Course(
            title="Introduction to Python",
            description="Learn the fundamentals of Python programming",
            category="Programming",
            is_premium=False
        )
        enrollment = Enrollment(
            user=user,
            course=course,
            progress=0
        )
        self.assertEqual(enrollment.user, user)
        self.assertEqual(enrollment.course, course)
        self.assertEqual(enrollment.progress, 0)

    def test_update_progress(self):
        user = User(
            username="johndoe",
            email="johndoe@example.com",
            password="password123"
        )
        course = Course(
            title="Introduction to Python",
            description="Learn the fundamentals of Python programming",
            category="Programming",
            is_premium=False
        )
        enrollment = Enrollment(
            user=user,
            course=course,
            progress=0
        )
        enrollment.update_progress(50)
        self.assertEqual(enrollment.progress, 50)

class TestCourseListView(unittest.TestCase):
    @patch('online_learning_platform.views.Course.objects.all')
    def test_get_queryset(self, mock_course_all):
        mock_course_all.return_value = [
            Course(
                title="Introduction to Python",
                description="Learn the fundamentals of Python programming",
                category="Programming",
                is_premium=False
            ),
            Course(
                title="UI/UX Design Fundamentals",
                description="Learn the basics of user interface and user