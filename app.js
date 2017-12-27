const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

// init Nexmo
const nexmo = new Nexmo({
    apiKey: 'a851344c',
    apiSecret: '4015e1a06b6f3210'
}, {debug: true});

// init app
const app = express();

// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// public folder setup
app.use(express.static(__dirname + '/public'));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index route
app.get('/', (req, res) => {
    res.render('index');
});

// catch from submit
app.post('/', (req, res) => {
    // res.send(req.body);
    // console.log(req.body);
    const number = req.body.number;
    const text = req.body.text;

    nexmo.message.sendSms(
        'Biscut', number, text, { text: 'unicode' },
        (err, responseData) => {
            if (err) console.log(err);
            else console.dir(responseData);
        }
    );
});

// defining the port
const port = 3000;

// start server
const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})