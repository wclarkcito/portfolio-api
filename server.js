require('dotenv').config()

const express = require('express');

// const cors = require('cors');

const sendGrid = require('@sendgrid/mail');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(process.env.test_env)
// app.use(cors({
//     options: ["http://localhost:3000/"]
// }));



app.get('/', (req, res) => {
    res.send('API Status: Running')
});



app.post('/api/email', (req, res) => {
    console.log(req.body)

    sendGrid.setApiKey(process.env.API_key);
    const msg = {
        to: 'wclarkcito@gmail.com',
        from: 'wclarkcito@gmail.com',
        subject: 'Website Contact',
        text: `email sent from ${req.body.email}. message: ${req.body.message}`
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


app.listen(PORT, () => {
    console.log(`App is listening to smooth sounds on port ${PORT}`);
});