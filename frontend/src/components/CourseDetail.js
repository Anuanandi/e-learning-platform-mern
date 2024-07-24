// src/components/CourseDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load course details. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const enrollCourse = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/courses/${id}/enroll`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the auth token in localStorage
        }
      });
      
      if (response.data.success) {
        setEnrolled(true);
        setError('');
      }
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Enrollment failed: ${err.response.data.message || 'Please try again.'}`);
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response received from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Error enrolling in course:', err);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!course) return <div className="error">Course not found.</div>;

  return (
    <div className="course-detail">
      <h1>{course.title}</h1>
      <p className="description">{course.description}</p>
      <p className="instructor">Instructor: {course.instructor}</p>
      <p className="duration">Duration: {course.duration}</p>
      <p className="price">Price: ${course.price}</p>
      {!enrolled ? (
      <p class="style">Go Back To Enroll This Course</p>
      ) : (
        <p className="enrolled-message">You are enrolled in this course!</p>
      )}
    </div>
  );
  
  
   
};

export default CourseDetail;