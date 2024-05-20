# Patient Appointment System

The Patient Appointment System is a web application designed to streamline the process of scheduling appointments for patients with healthcare providers. This system allows healthcare providers to manage patient records, schedule appointments, and track payment information.

## Features

- **Create Patient**: Healthcare providers can add new patients to the system by providing basic information such as name, contact details, and medical history.

- **List Patients**: Provides a dashboard view for healthcare providers to see a list of all patients registered in the system.

- **Search Functionality**: Allows healthcare providers to search for specific patients by name, making it easier to locate patient records.

- **View Patient Details**: Provides detailed information about each patient, including contact details, medical history, and appointment history.

- **Schedule Appointments**: Healthcare providers can schedule appointments for patients, specifying the date, time, and reason for the appointment.

- **Payment Integration**: Generates payment links for each appointment, allowing patients to make payments online securely.

## Technologies Used

- **Frontend**: Angular (or any other frontend framework of your choice)
- **Backend**: Node.js, Express.js
- **Database**: MySQL (or any other relational database)
- **Payment Gateway**: Stripe

## Installation

1. Clone the repository:

https://github.com/shubhkapoor/Patient-Appointment-System.git

2. Navigate to the project directory:

cd patient-appointment-system

3. Install dependencies for the frontend and backend:

cd patient-appointment-system
npm install

cd ../API
npm install

4. Set up the database:

- Create a MySQL database and import the provided SQL schema (`schema.sql`) to create the necessary tables.

5. Configure environment variables:

- Set up environment variables for your Stripe API keys and database connection details.

6. Start the backend server:

cd API
npm start

7. Start the frontend development server:

cd patient-appointment-system
npm start

8. Access the application:

- Open your web browser and navigate to `http://localhost:4200` to access the Patient Appointment System.
