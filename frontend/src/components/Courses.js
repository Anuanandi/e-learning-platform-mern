import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/courses/${courseId}/enroll`, {}, {
        headers: { Authorization: token }
      });
      alert('Enrolled successfully!');
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert(error.response?.data?.message || 'An error occurred while enrolling');
    }
  };

  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <Link to={`/courses/${course._id}`}>{course.title}</Link>
            <button onClick={() => handleEnroll(course._id)}>Enroll</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;