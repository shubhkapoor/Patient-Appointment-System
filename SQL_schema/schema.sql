create database PMS;
use PMS;

CREATE TABLE patients (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) UNIQUE,
    email VARCHAR(255) UNIQUE
);

CREATE TABLE appointments (
    id VARCHAR(36) PRIMARY KEY,
    patient_id VARCHAR(36) NOT NULL,
    appointment_date_time DATETIME NOT NULL,
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

CREATE TABLE Payments (
    appointment_id VARCHAR(255) NOT NULL,
    payment_intent_id VARCHAR(255) NOT NULL,
    payment_status VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);