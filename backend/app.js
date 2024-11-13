const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/User');

const Faculty = require('./models/Faculty');

const Attendance = require('./models/Attendance'); 


const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://root:root@student.iwlnz.mongodb.net/?retryWrites=true&w=majority&appName=student", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


    app.get('/register', async (req, res) => {
      const { name, email, phone, studentId, password, confirmPassword } = req.query;
    
      if (!name || !email || !phone || !studentId || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
      }
    
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
    
      try {
        const newUser = new User({ name, email, phone, studentId, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
      }
    });
    

    app.get('/fregister', async (req, res) => {
      const { name, email, phone, facultyId, password, confirmPassword } = req.query;
    
      if (!name || !email || !phone || !facultyId || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
      }
    
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      } 
    
      try {
        const newFaculty = new Faculty({ name, email, phone, facultyId, password });
        await newFaculty.save();
        res.status(201).json({ message: 'Faculty registered successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering faculty member', error: error.message });
      }
    });
    



app.get('/login', async (req, res) => {
  const { email, password } = req.query;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

app.get('/flogin', async (req, res) => {
  const { email, password } = req.query;  

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const faculty = await Faculty.findOne({ email });    

    if (!faculty || faculty.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', facultyId: faculty._id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});


app.get('/users', async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});


app.get('/faculty', async (req, res) => {
  try {
    const users = await Faculty.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});



app.get('/mark-attendance', async (req, res) => {
  const { subject, date, userIds } = req.query;

  if (!subject || !date || !userIds) {
    return res.status(400).json({ message: 'Subject, date, and userIds are required' });
  }

  try {
    const userIdsArray = userIds.split(','); 

    const attendance = new Attendance({
      subject,
      date,
      userIds: userIdsArray, 
    });

    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Error marking attendance:', error);

    res.status(500).json({ message: 'Error marking attendance', error: error.message });
  }
});


app.get('/attendance', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find(); 
    if (!attendanceRecords.length) {
      return res.status(404).json({ message: 'No attendance records found' });
    }

    res.status(200).json(attendanceRecords); 
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ message: 'Error fetching attendance data', error: error.message });
  }
});



app.listen(5001, () => console.log('Server running on port 5001'));
