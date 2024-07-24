const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Add sample courses after successful connection
    addSampleCourses();
  })
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);  // Exit the process if unable to connect to MongoDB
  });

// Routes
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
app.use('/api', userRoutes);
app.use('/api/courses', courseRoutes);

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Function to add sample courses
async function addSampleCourses() {
  const Course = require('./models/Course');
  const sampleCourses = [
    {
      title: 'Introduction to JavaScript',
      description: 'Learn the basics of JavaScript programming',
      instructor: 'John Doe',
      lessons: [
        { title: 'Variables and Data Types', content: 'Learn about variables and data types in JavaScript' },
        { title: 'Functions', content: 'Understand how to create and use functions in JavaScript' }
      ]
    },
    {
      title: 'Advanced React Techniques',
      description: 'Master advanced concepts in React development',
      instructor: 'Jane Smith',
      lessons: [
        { title: 'Hooks in Depth', content: 'Dive deep into React Hooks and their use cases' },
        { title: 'State Management with Redux', content: 'Learn how to manage complex state with Redux' }
      ]
    }
  ];

  try {
    for (let course of sampleCourses) {
      const existingCourse = await Course.findOne({ title: course.title });
      if (!existingCourse) {
        await Course.create(course);
        console.log(`Added sample course: ${course.title}`);
      }
    }
  } catch (error) {
    console.error('Error adding sample courses:', error);
  }
}