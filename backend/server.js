const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// POST - Save User Data
app.post('/users', (req, res) => {
    const newUser = req.body;

    fs.readFile('users.json', (err, data) => {
        let users = [];
        if (!err) {
            try {
                users = JSON.parse(data);
            } catch (parseErr) {
                // If JSON file is corrupt or empty, reset users array
                users = [];
            }
        }

        users.push(newUser);

        fs.writeFile('users.json', JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
                res.status(500).send('Error saving data');
            } else {
                res.status(201).send('User data saved');
            }
        });
    });
});

// GET - Retrieve User Data
app.get('/users', (req, res) => {
    fs.readFile('users.json', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // If file doesn't exist, return an empty array
                return res.json([]);
            } else {
                console.error('Error reading file:', err);
                return res.status(500).send('Error reading data');
            }
        }

        try {
            const users = JSON.parse(data);
            res.json(users);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).send('Error reading data');
        }
    });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
