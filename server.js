const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {exec} = require('child_process');
// const {spawn} = require('child_process');

const DEFAULT_PORT = process.env.PORT || 3000;

// initialize express.
const app = express();

// Initialize variables.
let port = DEFAULT_PORT;

// Configure morgan module to log all requests.
app.use(morgan('dev'));

// Setup app folders.
app.use(express.static('app'));

// Set up a route for index.html
// should not be '*' because everything command or interactions will run this part
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// generate text when click on button
app.get('/generate_text', (req, res) => {
    // only need to check or debug
    console.log("on est au bon endroit d'exécution");

    exec('python3 main.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Erreur lors de la génération du texte');
        }
        // only need to check or debug
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.send(stdout);
    });

    // i don't know which one is better, execution with exec allow error message
    // but code with spawn is cleanest

    // var dataToSend;
    // // spawn new child process to call the python script
    // const python = spawn('python', ['main.py']);
    // // collect data from script
    // python.stdout.on('data', function (data) {
    // console.log('Pipe data from python script ...');
    // dataToSend = data.toString();
    // console.log("data to send = " + dataToSend)
    // });
    // // in close event we are sure that stream from child process is closed
    // python.on('close', (code) => {
    // console.log(`child process close all stdio with code ${code}`);
    // console.log(typeof dataToSend);
    // // send data to browser
    // res.send(dataToSend);
    // });
});

// Start the server.
app.listen(port);
console.log(`Listening on port ${port}...`);
