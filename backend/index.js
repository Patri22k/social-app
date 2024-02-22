const express = require('express');
const cors = require('cors');
const redis = require('redis');

const app = express();

app.use(cors());
app.use(express.json());

let messages = [];

app.get('/messages', (req, res) => {
    res.send(JSON.stringify(messages)).end();
});

app.post('/messages', (req, res) => {
    messages.push(req.body.message);
    res.status(201).json({ status: 200 });
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});