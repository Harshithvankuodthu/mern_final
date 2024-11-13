import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const LoginSelection = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate(); 

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedRole === 'admin') {
      navigate('/admin'); 
    } else if (selectedRole === 'user') {
      navigate('/login'); 
    } else if (selectedRole === 'faculty') {
      navigate('/facultylogin'); 
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Select Login Type</h2>
      <div style={styles.selectContainer}>
        <label htmlFor="role" style={styles.label}>Choose Your Role:</label>
        <select 
          id="role" 
          value={selectedRole} 
          onChange={handleRoleChange} 
          style={styles.select}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="faculty">Faculty</option>
          <option value="user">Student</option>

        </select>
      </div>

      <button onClick={handleSubmit} style={styles.submitButton}>
        Proceed to Login
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f7fc',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '30px auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '28px',
    marginBottom: '20px',
  },
  selectContainer: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  label: {
    fontSize: '16px',
    color: '#333',
    marginRight: '10px',
  },
  select: {
    fontSize: '16px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    width: '100%',
    cursor: 'pointer',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    width: '100%',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s ease',
  },
};

export default LoginSelection;
