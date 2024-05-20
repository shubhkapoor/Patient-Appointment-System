const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(cors());
const PORT = 3000;

const stripe = require('stripe')('sk_test_51PHhOQSF2B9RNeJorJy5B3Q4VRHzMdsCR2TTpxfbs7KkKdZXEUm4xUHfvnLEUUpxzkKS4Ams9QFHGcD7TVVgzw0E00Mwz0xKQu');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS,PUT, PATCH, DELETE");

    next();
});

// Creating MYSQL connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'PMS'
});

// Connect to MYSQL
connection.connect((err) => {
    if (err) {
        console.log('Could not connect to Mysql:- ' + err);
        return;
    }

    console.log("Mysql connected successfully");
});

app.use(bodyParser.json());

// Routes

// Create Patient
app.post('/patients', (req, res) => {

    const { name, mobile, email } = req.body;
    const id = uuid();

    console.log(id);
    const sqlQuery = 'INSERT INTO patients (id , name , mobile , email) VALUES (? , ? , ? , ?)';

    connection.query(sqlQuery, [id, name, mobile, email], (err, results) => {
        if (err) {
            console.log('Error creating Patients ' + err);

            res.status(500).json({
                message: "Error creating patient"
            });

            return;
        }

        res.status(201).json({
            id: id, name, mobile, email
        });
    });
});

// Function to generate UUID
function uuid() {
    let dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// Getting list of patients
app.get('/patients', (req, res) => {

    const sqlQuery = 'SELECT * FROM patients';

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.log("Error listing patients: " + err);

            res.status(500).json({
                message: "Error listing patients"
            });

            return;
        }

        res.status(200).json({
            data: results
        });
    });
});

// Get Patient by ID
app.get('/patients/:id', (req, res) => {
    const id = req.params.id;

    const sqlQuery = 'SELECT * FROM patients WHERE id = ?';

    connection.query(sqlQuery, [id], (err, results) => {
        if (err) {
            console.log('Error getting patient: ' + err);

            res.status(500).json({
                message: 'Error getting patient'
            });

            return;
        }

        if (results.length == 0) {
            res.status(404).json({
                message: 'Patient not found.'
            });
        }

        res.status(200).json(results[0]);
    });
});

// Create Appointment
app.post('/appointments', (req, res) => {
    const { patient_id, appointment_date_time, notes } = req.body;
    const id = uuid();

    const sqlQuery = 'INSERT INTO appointments(id,patient_id,appointment_date_time,notes) VALUES (? , ? , ? , ?)';

    connection.query(sqlQuery, [id, patient_id, appointment_date_time, notes], (err, results) => {
        if (err) {
            console.log('Error occured in creating appointment: ' + err);

            res.status(500).json({
                message: 'Error occured in creating appointment'
            });

            return;
        }

        res.status(201).json({
            id, patient_id, appointment_date_time, notes
        });
    });
});

// Get list of Appointments
app.get('/appointments', (req, res) => {
    const sqlQuery = 'SELECT * FROM appointments';

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.log('Error getting appointment: ' + err);

            res.status(500).json({
                message: 'Error getting appointment'
            });

            return;
        }

        res.status(200).json({
            data: results
        });
    });
});

// Get Appointments for particular Patient
app.get('/appointments/:id/appointments', (req, res) => {
    const id = req.params.id;
    const sqlQuery = 'SELECT * FROM appointments where patient_id = ?';

    connection.query(sqlQuery, [id], (err, results) => {
        if (err) {
            console.log('Error getting appointment: ' + err);

            res.status(500).json({
                message: 'Error getting appointment'
            });

            return;
        }

        res.status(200).json(results);
    });
});

// Stripe Integration
app.get('/success', async (req, res) => {
    // const session_id = req.query.session_id;

    const {session_id, patient_id, appointment_date_time, notes } = req.query;
    const appointment_id = uuid();


    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        // console.log(session);
        if (session.payment_status === 'paid') {
            // res.send('Payment Successful');

            const insertAppointmentQuery = 'INSERT INTO appointments (id, patient_id, appointment_date_time, notes) VALUES (?, ?, ?, ?)';
            connection.query(insertAppointmentQuery, [appointment_id, patient_id, appointment_date_time, notes], (err, result) => {
                if (err) {
                    console.error('Error inserting appointment:', err);
                    return;
                }
                console.log('Appointment inserted:', result);
            });

            // Insert payment data into the payments table
            
            const insertPaymentQuery = 'INSERT INTO payments (appointment_id, payment_intent_id, payment_status, amount) VALUES (?, ?, ?, ?)';
            const paymentId = session.payment_intent;

            connection.query(insertPaymentQuery, [appointment_id, paymentId, 'paid', '500'], (err, result) => {
                if (err) {
                    console.error('Error inserting payment:', err);
                    return;
                }
                console.log('Payment inserted:', result);
            });

            res.redirect('http://localhost:4200/dashboard');
        }
        else {
            res.send('Payment Unsuccessful');
        }
    } catch (error) {
        console.log('Error in payment confirmation');
    }

});

app.get('/cancel', (req, res) => {
    res.send('Payment Cancelled');
});

app.post('/create-checkout-session', async (req, res) => {
    try {

        const { patient_id, appointment_date_time, notes } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: 'Appointment Payment',
                        },
                        unit_amount: 500*100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}&patient_id=${patient_id}&appointment_date_time=${appointment_date_time}&notes=${notes}`,
            cancel_url: 'http://localhost:3000/cancel',
        });

        // console.log("session==> ", session);

        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

app.get('/payment/:id' , (req,res)=>{
    const id = req.params.id;
    const query = 'SELECT * FROM payments WHERE appointment_id = ?';

    connection.query(query , [id] , (err,results) => {
        if(err) {
            console.log('Error getting payment details: ' + err);

            res.status(500).json({
                message : 'Error getting payment details'
            });

            return;
        }

        res.status(200).json(results[0]);
    })

});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})