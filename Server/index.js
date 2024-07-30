const express = require('express');
const cors = require('cors');
const connection = require('./db');

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

const index = express();
const port = 5000;

index.use(express.json());
index.use(cors());

index.post('/users', (req, res) => {
    try {
        const { name, email, password } = req.body;
        const sql = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';

        connection.query(sql, [name, email, password], (err, result) => {
            if (err) {
                // Check for duplicate entry error
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ sqlMessage: err.sqlMessage });
                }
                console.error('Error inserting user:', err);
                return res.status(500).json({ sqlMessage: 'An error occurred while adding the user' });
            }
            res.send('User added successfully');
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ sqlMessage: 'An unexpected error occurred' });
    }
});

index.post('/api', (req, res) => {
    try {
        const { value1, value2, value3 } = req.body;
        const sql = `INSERT INTO api (value1, value2, value3) VALUES (?,?,?)`;
        connection.query(sql, [value1, value2, value3], (err, result) => {
            if (err) {
                console.error('Error inserting api data:', err);
                return res.status(500).json({ sqlMessage: 'An error occurred while adding the API data' });
            }
            res.send(result);
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ sqlMessage: 'An unexpected error occurred' });
    };
})

index.get('/api', (req, res) => {
    try {
        const sql = 'SELECT * FROM api';
        connection.query(sql, (err, result) => {
            if (err) {
                console.error('Error retrieving users:', err);
                return res.status(500).json({ sqlMessage: 'An error occurred while retrieving the users' });
            }
            res.json(result);
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ sqlMessage: 'An unexpected error occurred' });
    }
});

index.delete('/api/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    const sql = 'DELETE FROM api WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting API data:', err);
            return res.status(500).json({ sqlMessage: 'An error occurred while deleting the API data' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'API data not found' });
        }
        res.status(200).json({ message: 'API data deleted successfully' });
    });
});

index.put('/api/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    const { value1, value2, value3 } = req.body;
    const sql = 'UPDATE api SET value1 =?, value2 =?, value3 =? WHERE id =?';
    connection.query(sql, [value1, value2, value3, id], (err, result) => {
        if (err) {
            console.error('Error updating API data:', err);
            return res.status(500).json({ sqlMessage: 'An error occurred while updating the API data' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'API data not found' });
        }
        res.status(200).json({
            message: 'API data updated successfully',
        });
    });
});



index.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
