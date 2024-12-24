const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// POST endpoint to save user data
app.post('/users', (req, res) => {
    const newUser = req.body;

    // Read existing data
    fs.readFile('users.json', (err, data) => {
        let users = [];
        if (!err) {
            users = JSON.parse(data);
        }
        // Add new user to the list
        users.push(newUser);

        // Write updated list back to file
        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error saving data');
            } else {
                res.status(201).send('User data saved');
            }
        });
    });
});

// GET endpoint to retrieve user data
app.get('/users', (req, res) => {
    fs.readFile('users.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
