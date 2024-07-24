import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password
      });
      console.log('Registration successful:', response.data);
      // Clear form and show success message
      setUsername('');
      setEmail('');
      setPassword('');
      setError('Registration successful! You can now log in.');
    } catch (error) {
      console.error('Error registering:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        setError(`Registration failed: ${error.response.data.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request:', error.request);
        setError('No response received from server. Please try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        setError(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{color: error.includes('successful') ? 'green' : 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;