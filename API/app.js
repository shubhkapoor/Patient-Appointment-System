const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(cors());
const PORT = 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
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
connection.connect((err)=>{
    if(err) {
        console.log('Could not connect to Mysql:- ' + err);
        return;
    }

    console.log("Mysql connected successfully");
});

app.use(bodyParser.json());

// Routes

// Create Patient
app.post('/patients' , (req,res)=>{

    const {name , mobile , email} = req.body;
    const id = uuid();

    console.log(id);
    const sqlQuery = 'INSERT INTO patients (id , name , mobile , email) VALUES (? , ? , ? , ?)';

    connection.query(sqlQuery , [id,name,mobile,email] , (err,results)=>{
        if(err) {
            console.log('Error creating Patients ' + err);

            res.status(500).json({
                message : "Error creating patient"
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
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c === 'x' ? r :(r&0x3|0x8)).toString(16);
    });
}


// Getting list of patients
app.get('/patients' , (req,res)=>{

    const sqlQuery = 'SELECT * FROM patients';

    connection.query(sqlQuery , (err,results)=>{
        if(err) {
            console.log("Error listing patients: " + err);

            res.status(500).json({
                message : "Error listing patients"
            });

            return;
        }

        res.status(200).json({
            data : results
        });
    });
});


// Get Patient by ID
app.get('/patients/:id' , (req,res)=>{
    const id = req.params.id;

    const sqlQuery = 'SELECT * FROM patients WHERE id = ?';

    connection.query(sqlQuery , [id] , (err,results)=>{
        if(err) {
            console.log('Error getting patient: ' + err);

            res.status(500).json({
                message:'Error getting patient'
            });

            return;
        }

        if(results.length == 0) {
            res.status(404).json({
                message: 'Patient not found.'
            });
        }

        res.status(200).json(results[0]);
    });
});


// Create Appointment
app.post('/appointments' , (req,res)=>{
    const {patient_id , appointment_date_time , notes} = req.body;
    const id = uuid();

    const sqlQuery = 'INSERT INTO appointments(id,patient_id,appointment_date_time,notes) VALUES (? , ? , ? , ?)';

    connection.query(sqlQuery , [id , patient_id , appointment_date_time , notes] , (err,results)=>{
        if(err) {
            console.log('Error occured in creating appointment: ' + err);

            res.status(500).json({
                message : 'Error occured in creating appointment'
            });

            return;
        }

        res.status(201).json({
            id, patient_id, appointment_date_time, notes
        });
    });
});


// Get list of Appointments
app.get('/appointments' , (req,res)=>{
    const sqlQuery = 'SELECT * FROM appointments';

    connection.query(sqlQuery , (err , results)=>{
        if(err) {
            console.log('Error getting appointment: ' + err);

            res.status(500).json({
                message: 'Error getting appointment'
            });

            return;
        }

        res.status(200).json({
            data : results
        });
    });
});


// Get Appointments for particular Patient
app.get('/appointments/:id/appointments' , (req,res)=>{
    const id = req.params.id;
    const sqlQuery = 'SELECT * FROM appointments where patient_id = ?';

    connection.query(sqlQuery , [id] , (err , results)=>{
        if(err) {
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
app.post('/appointments/:id/payment-link' , (req,res)=>{
    const id = req.params.id;
    
    const paymentLink = `https://dummy-stripe-payment-link/${id}`;

    res.json(paymentLink);
})


// Start the server
app.listen(PORT , ()=>{
    console.log(`Server is running at port ${PORT}`);
})