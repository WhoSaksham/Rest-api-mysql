const express = require('express');
const router = express.Router();
const connection = require('../db')
const { body, validationResult } = require('express-validator');

router.post('/addcustomer', [
    body('name', 'Name number must of minimum 5 characters').isLength({ min: 5 }),
    body('email', 'Please enter valid Email').isEmail(),
    body('phone', 'Phone number must of 10 digits').isLength(10),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let customer = req.body;
    let query = "INSERT INTO customer_data (name, email, phone) values(?, ?, ?)"
    connection.query(query, [customer.name, customer.email, customer.phone], (err) => {
        if (!err) {
            return res.status(200).json({ "Status": "Customer added successfully", "addedCustomer": customer });
        }
        else {
            return res.status(500).json({ "error": err.message });
        }
    });
});

router.get('/allcustomers', (req, res) => {
    let query = "SELECT *FROM customer_data ORDER BY posted_date"
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json({ results });
        }
        else {
            return res.status(500).json({ "error": err.message });
        }
    });
});

router.delete('/deletecustomer/:email', (req, res) => {
    let custEmail = req.params.email
    let query = "DELETE FROM customer_data WHERE email = ?"
    connection.query(query, custEmail, (err, rows) => {
        if (!err) {
            if (rows.affectedRows === 0) {
                return res.status(404).json({ "error": 'Customer not found' });
            }
            return res.status(200).json({ "Status": "Customer deleted successfully", "Rows Affected": rows.affectedRows });
        }
        else {
            return res.status(500).json({ "error": err.message });
        }
    });
});

router.get('/searchcustomer/:email', (req, res) => {
    let custEmail = req.params.email
    let query = "SELECT *FROM customer_data WHERE email = ?"
    connection.query(query, custEmail, (err, results) => {
        if (!err) {
            if (results == 0) {
                return res.status(404).json({ "error": 'Customer not found' });
            }
            return res.status(200).json({ results });
        }
        else {
            return res.status(500).json({ "error": err.message });
        }
    });
});


module.exports = router;