import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const UsersList = () => {
  const [users, setUsers] = useState([]); 
  const [faculty, setFaculty] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [usersResponse, facultyResponse] = await Promise.all([
          axios.get('https://mern-final-5a7r.onrender.com/users'), 
          axios.get('https://mern-final-5a7r.onrender.com/faculty'), 
        ]);
        setUsers(usersResponse.data); 
        setFaculty(facultyResponse.data); 
      } catch (err) {
        setError('Failed to fetch users and faculty');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.adminSection}>
        <h3 style={styles.adminHeading}>Admin Actions</h3>
        <div style={styles.adminButtons}>
          <Link to="/register" style={styles.adminButton}>Register Student</Link>
          <Link to="/facultyregister" style={styles.adminButton}>Register Faculty</Link>
        </div>
      </div>

      <h2 style={styles.heading}>Registered Students</h2>
      {users.length === 0 ? (
        <p style={styles.noUsers}>No students found.</p>
      ) : (
        <div style={styles.userList}>
          {users.map((user) => (
            <div key={user._id} style={styles.userCard}>
              <h3 style={styles.userName}>{user.name}</h3>
              <p style={styles.userDetail}><strong>Email:</strong> {user.email}</p>
              <p style={styles.userDetail}><strong>Phone:</strong> {user.phone}</p>
              <p style={styles.userDetail}><strong>Student ID:</strong> {user.studentId}</p>
            </div>
          ))}
        </div>
      )}

      <h2 style={styles.heading}>Registered Faculty</h2>
      {faculty.length === 0 ? (
        <p style={styles.noUsers}>No faculty found.</p>
      ) : (
        <div style={styles.userList}>
          {faculty.map((fac) => (
            <div key={fac._id} style={styles.userCard}>
              <h3 style={styles.userName}>{fac.name}</h3>
              <p style={styles.userDetail}><strong>Email:</strong> {fac.email}</p>
              <p style={styles.userDetail}><strong>Phone:</strong> {fac.phone}</p>
              <p style={styles.userDetail}><strong>Faculty ID:</strong> {fac.facultyId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f7fc',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px',
    margin: '30px auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '28px',
    marginBottom: '20px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#007bff',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: '16px',
  },
  noUsers: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#333',
    marginTop: '20px',
  },
  userList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  userCardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  },
  userName: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  userDetail: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '8px',
  },
  adminSection: {
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  adminHeading: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '15px',
  },
  adminButtons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  adminButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  adminButtonHover: {
    backgroundColor: '#0056b3',
  }
};

export default UsersList;
