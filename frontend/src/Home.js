import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceList = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('https://mern-final-5a7r.onrender.com/attendance');
        
        const today = new Date().toLocaleDateString('en-GB', {
          weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
        });

        const filteredRecords = response.data.filter(record => {
          const recordDate = new Date(record.date).toLocaleDateString('en-GB', {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
          });
          
          return recordDate === today;  
        });

        setAttendance(filteredRecords);
      } catch (err) {
        setError('Failed to fetch attendance records');
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Attendance Records for {new Date().toLocaleDateString()}</h2>
      {attendance.length === 0 ? (
        <p style={styles.noRecords}>No attendance records found for today.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Subject</th>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>Student IDs</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record._id} style={styles.tableRow}>
                <td style={styles.tableCell}>{record.subject}</td>
                <td style={styles.tableCell}>{record.date}</td>
                <td style={styles.tableCell}>
                  {record.userIds.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '1000px',
    margin: '20px auto',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#007bff',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: '16px',
  },
  noRecords: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#333',
    marginTop: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    padding: '10px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  tableRow: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  }
};

export default AttendanceList;
