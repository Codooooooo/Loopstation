// Import required modules
const express = require('express');
const port = 3031;
const app = express();
const router = express.Router();
const cors = require("cors");
const path = require('path')
//get the request from http
const morgan = require('morgan')
// Set up view engine and views folder
app.set('view engine', 'ejs');
app.set('views', './views');
// Middleware for serving static files, JSON, URL encoding, and logging
app.use(express.static('public'))
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
//cross origin resource sharing
app.use(cors());
// Initialize and use cookie-parser middleware
const cookieParser = require('cookie-parser');
app.use(cookieParser());
//allow any origin to access our API
app.use(cors({ origin: '*' }));
// Use the router middleware
app.use(router);
// Define routes for serving pages from the public folder
app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public', 'homePage.html'));
});
app.get('/login', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public', 'login.html'));
});
app.get('/homePage', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public', 'homePage.html'));
});
app.get('/search', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public', 'search.html'));
});
app.get('/Aboutus', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public', 'Aboutus.html'));
});
app.get('/productManage', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public', 'productManage.html'));
});
app.get('/userManagement', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public', 'userManagement.html'));
});
app.get('/100001', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public', '100001.html'));
});
app.get('/100002', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public', '100002.html'));
});
app.get('/100003', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public', '100003.html'));
});
app.get('/200001', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public', '200001.html'));
});
app.get('/300001', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public', '300001.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})
