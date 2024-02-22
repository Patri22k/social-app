const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let messages = [];

app.get('/messages', (req, res) => {
    let html = '<h1>Messages</h1>';
    messages.forEach(msg => {
        html += `<p>${msg.text}</p>`;
    });
    res.send(html);
});

app.post('/messages', (reg, res) => {
    messages.push(req.body);
    res.status(201).send();
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});