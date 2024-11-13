import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('https://mern-final-5a7r.onrender.com/register', {
        params: {
          name,
          email,
          phone,
          studentId,
          password,
          confirmPassword,
        },
      });

      if (response && response.data) {
        setMessage(response.data.message); 
      }
    } catch (error) {
      setMessage(error.response?.data.message || 'Registration failed'); 
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register Student</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.inputField}
        />
        <button type="submit" style={styles.submitButton}>Register</button>
      </form>

      {message && (
        <p style={message.includes('success') ? styles.successMessage : styles.errorMessage}>
          {message}
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    margin: 'auto',
    marginTop: '50px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputField: {
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#333',
    transition: 'border-color 0.3s ease',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  successMessage: {
    color: 'green',
    marginTop: '15px',
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    marginTop: '15px',
    textAlign: 'center',
  },
};

styles.submitButton[':hover'] = {
  backgroundColor: '#0056b3',
};

export default Register;
