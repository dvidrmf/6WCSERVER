// 

// const express = require('express');
import express from 'express'; // Same thing
const __dirname = import.meta.dirname;

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/html/home.html')
});

app.get('/userPage', (req, res) =>{
    res.sendFile(__dirname + '/html/user.html')
});

app.get('/student', (req, res) => {
    res.sendFile(__dirname + '/html/student.html');
});

// Admin Form Page Route
app.get('/adminForm', (req, res) => {
    res.sendFile(__dirname + '/html/adminForm.html');
});

app.get('/user', (req, res) =>{
    const userId = req.query.id;
    const userName = req.query.name
    if (userId ) {
        res.send (`<html><body><h1>User ${username}'s Id is: ${userId}</h1></body></html>`)
    } else res.status(400).send('User ID is required');
})


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
})

app.get('/getAdmin', (req, res) => {
    const response = {
        adminID: req.query.adminID,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        department: req.query.department  
    }

    console.log("Response is: ", response);
    res.end(`Receive Data: ${JSON.stringify(response)}`);
})

const server = app.listen(5000, () => {
    const host = server.address().address;
    const port = server.address().port;
    /* console.log("Server running at http://%s:%s", host, port);
    console.log("Server running at http://" +host+":"+port); */
    console.log(`Server running at http://${host}:${port}`); // same thing
})