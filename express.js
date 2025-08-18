import express from 'express';
import path from 'path';
import multer from 'multer';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static('public'));

const urlEncodeParser = bodyParser.urlencoded({ extended: false });

// Multer storage configuration with a more secure filename
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        // Use a timestamp to create a unique filename, preventing collisions and security risks
        callback(null, Date.now() + '-' + file.originalname);
    }
});

// Configure Multer to handle a single file field named 'file'
const upload = multer({ storage: storage }).fields([{ name: 'file', maxCount: 1 }]);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/home.html'));
});

app.get('/userPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/user.html'));
});

app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/student.html'));
});

// Admin Form Page Route
app.get('/adminForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/adminForm.html'));
});

// Route for file upload form
app.get('/uploadForm', (req, res) => {
    res.sendFile(path.join(__dirname, '/uploadForm.html'));
});

// Route to handle file upload
// The route name is changed to '/upload' to match the HTML form's action attribute
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(400).send('Error uploading file');
        }

        // Check if a file was actually uploaded before trying to access it
        if (!req.files || !req.files['file'] || req.files['file'].length === 0) {
            return res.status(400).send('No file uploaded.');
        }

        const username = req.body.username;
        const uploadedFile = req.files['file'][0];

        console.log(`Username: ${username}`);
        console.log(`File path: ${uploadedFile.path}`);
        
        res.end('File and form data uploaded successfully!');
    });
});

app.get('/user', (req, res) => {
    const userId = req.query.id;
    const userName = req.query.name;
    if (userId) {
        res.send(`<html><body><h1>User ${userName}'s Id is: ${userId}</h1></body></html>`);
    } else {
        res.status(400).send('User ID is required');
    }
});

// API Routes
app.get('/getStudent', (req, res) => {
    const response = {
        studentID: req.query.studentID,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        section: req.query.section
    };

    console.log('Response is: ', response);
    res.end(`Receive Data: ${JSON.stringify(response)}`);
});

app.post('/postAdmin', urlEncodeParser, (req, res) => {
    const response = {
        adminID: req.body.adminID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department
    };

    console.log('Response is: ', response);
    res.end(`Receive Data: ${JSON.stringify(response)}`);
});

const server = app.listen(5000, () => {
    console.log(`Server running at http://localhost:5000`);
});