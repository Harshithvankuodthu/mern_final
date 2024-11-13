import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]); 
  const [selectedSubject, setSelectedSubject] = useState(''); 
  const [currentDate, setCurrentDate] = useState(''); 

  const subjects = [
    'Mathematics',
    'Web Technologies',
    'Deep Learning',
    'Machine Learning',
    'Computer Networks'
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; 
    setCurrentDate(dateString);
  }, []);

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedSubject || !selectedUsers.length) {
      alert('Please select a subject and at least one student.');
      return;
    }

    try {
      const userIds = selectedUsers.join(','); 
      const response = await axios.get(
        `http://localhost:5001/mark-attendance?subject=${selectedSubject}&date=${currentDate}&userIds=${userIds}`
      );
      alert(response.data.message); 
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Error marking attendance.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container">
      <h2 className="title">Mark Attendance</h2>

      <div className="form-group">
        <label className="label">Select Subject:</label>
        <select
          value={selectedSubject}
          onChange={handleSubjectChange}
          className="input"
        >
          <option value="">Select Subject</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="label">Today's Date:</label>
        <input
          type="date"
          value={currentDate}
          readOnly
          className="input"
        />
      </div>

      <div className="students-list">
        <p><strong>Student ID's:</strong></p>
        {users.map((user) => (
          <div key={user._id} className="student-item">
            <p>{user.studentId}</p>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedUsers.includes(user._id)}
                onChange={() => handleCheckboxChange(user._id)}
                className="checkbox"
              />
            </label>
          </div>
        ))}
      </div>

      <div>
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </div>

      <style jsx>{`
        /* Global styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f7fc;
          color: #333;
          padding: 20px;
        }

        /* Container */
        .container {
          max-width: 900px;
          margin: 0 auto;
          background-color: #fff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .title {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
          text-align: center;
        }

        /* Form styles */
        .form-group {
          margin-bottom: 20px;
        }

        .label {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          display: block;
        }

        .input {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 6px;
          outline: none;
          box-sizing: border-box;
        }

        .input:focus {
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }

        /* Students list */
        .students-list {
          margin-top: 20px;
          margin-bottom: 20px;
        }

        .student-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          margin-bottom: 10px;
          background-color: #f9f9f9;
        }

        .student-item p {
          margin: 0;
          font-size: 16px;
          color: #333;
        }

        .checkbox-label {
          font-size: 14px;
        }

        /* Button */
        .submit-button {
          padding: 12px 25px;
          background-color: #007bff;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-button:hover {
          background-color: #0056b3;
        }

        .submit-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        /* Alerts */
        .alert {
          background-color: #f8d7da;
          color: #721c24;
          padding: 10px;
          margin: 10px 0;
          border-radius: 6px;
          border: 1px solid #f5c6cb;
        }
      `}</style>
    </div>
  );
};

export default UsersList;
