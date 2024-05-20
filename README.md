# Patient Appointment System

The Patient Appointment System is a web application designed to streamline the process of scheduling appointments for patients with healthcare providers. This system allows healthcare providers to manage patient records, schedule appointments, and track payment information.

## Features

- **Create Patient**: Healthcare providers can add new patients to the system by providing basic information such as name, mobile number and email.

- **List Patients**: Provides a dashboard view for healthcare providers to see a list of all patients registered in the system.

- **Search Functionality**: Allows healthcare providers to search for specific patients by name, making it easier to locate patient records.

- **View Patient Details**: Provides detailed information about each patient, including contact details, medical history, and appointment history.

- **Schedule Appointments**: Healthcare providers can schedule appointments for patients, specifying the date, time, and reason for the appointment.

- **Payment Integration**: Generates payment links for each appointment, allowing patients to make payments online securely (Just Use an Indian Stripe test card India (IN) 4000003560000008 Visa).

## Technologies Used

- **Frontend**: Angular
- **Backend**: Node.js, Express.js
- **Database**: MySQL
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

5. Configure variables:

- Set up variables for your Stripe API keys and database connection details.

6. Start the backend server:

   cd API
   npm start

7. Start the frontend development server:

   cd patient-appointment-system
   ng serve

8. Access the application:

- Open your web browser and navigate to `http://localhost:4200` to access the Patient Appointment System.
