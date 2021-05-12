require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sendGrid = require('@sendGrid/mail');

const app = express();

app.use(bodyParser.json());
console.log(process.env.test_env)
app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();


// });

app.get('/api', (req, res) => {
    res.send('API Status: Running')
});

app.post('/api/email', (req, res) => {
    console.log(req.body)
    sendGrid.setApiKey(API_key);
    // sendGrid.setApiKey(process.env.API_key);
    const msg = {
        to: 'wclarkcito@gmail.com',
        from: req.body.email,
        subject: 'Website Contact',
        text: req.body.message
    }
    sendGrid.send(msg)
        .then(result => {
            console.log(result)

            res.status(200).json({
                success: true
            })

        })
        .catch(err => {

            console.log('error:', err);
            res.status(401).json({
                success: false
            });

        })
});


app.listen(3030, '0.0.0.0');