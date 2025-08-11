import express from 'express';
import path from 'path';
const __dirname = import.meta.dirname;

const app = express();

// Debug: Log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Serve static files from current directory
app.use(express.static('.'));
app.use('/css', express.static('css'));
app.use('/public', express.static('public'));

// Debug: Check if files exist
import fs from 'fs';
console.log('=== FILE CHECK ===');
console.log('Current directory:', __dirname);
console.log('Files in current directory:', fs.readdirSync('.'));

// Check for CSS files
const cssLocations = ['./home.css', './css/home.css', './public/css/home.css'];
cssLocations.forEach(location => {
    if (fs.existsSync(location)) {
        console.log(`✅ Found CSS at: ${location}`);
    } else {
        console.log(`❌ No CSS at: ${location}`);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'home.html'));
});

app.get('/userPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'user.html'));
});

app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'student.html'));
});

app.get('/adminForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'adminForm.html'));
});

app.get('/user', (req, res) => {
    const userId = req.query.id;
    const userName = req.query.name;
    if (userId) {
        res.send(`<html><body><h1>User ${userName}'s Id is: ${userId}</h1></body></html>`)
    } else res.status(400).send('User ID is required');
});

// API Routes
app.get('/getStudent', (req, res) => {
    const response = {
        studentID: req.query.studentID,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        section: req.query.section
    }

    console.log("Response is: ", response);
    res.end(`Receive Data: ${JSON.stringify(response)}`);
});

app.get('/getAdmin', (req, res) => {
    const response = {
        adminID: req.query.adminID,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        department: req.query.department  
    }

    console.log("Response is: ", response);
    res.end(`Receive Data: ${JSON.stringify(response)}`);
});

const server = app.listen(5000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server running at http://localhost:${port}`);
    console.log('Try accessing your CSS at: http://localhost:5000/home.css');
});