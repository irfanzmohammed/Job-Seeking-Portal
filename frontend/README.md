                                          JobZee - Job Seeker & Employer Web Application

JobZee is a MERN stack-based web application designed to facilitate job seekers and employers to connect through job postings and applications. It includes a unique feature for students called the Pool Campus Tracker, which allows users to find various pool campus drives happening across colleges in different cities.

//Features//
Job Seeker Features:
User Roles:
 Job seekers can sign up and log in using their credentials. Upon signing up, job seekers must fill in their name, email, password, phone number, address, and a skill (a single skill for filtering jobs).

Profile Management:
A profile drawer allows job seekers to manage their skills.
Job seekers can add, update, or remove skills in their profile.

Job Filtering:
Based on the skills in their profile, job seekers can filter jobs in the "All Jobs" section.
The application suggests jobs that match their skills, making job searching more efficient.
Pool Campus Drive Tracker:

A unique feature of JobZee is the Pool Campus Tracker.
Job seekers can view various campus drives happening in colleges across cities.
This helps students find opportunities specifically tailored for campus hiring.

Employer Features:
Post Job Openings:
Employers can sign up and log in to post job openings.
When posting a job, the employer can provide details like the job title, description, skills required, location, and salary range.
Employers can also specify interview schedules and locations.

View Applications:
Employers can view all job applications submitted by job seekers.
Employers can review resumes and applicant details to decide who to interview or hire.

Pool Campus Drives:
Employers or companies can post pool campus drives targeted toward students.
They can include detailed information about the drive (e.g., eligibility, date, location) and a link to the application form (such as a Google Form link).


//Technologies Used//
Frontend:
React.js for building the user interface.
Redux for state management (language settings, authentication, job seeker’s profile, etc.).
React Router for navigation between pages.
Material-UI for UI components (Profile drawer, Modals, etc.).


Backend:
Node.js with Express.js to handle requests and responses.
MongoDB for the database to store user data, job postings, and applications.
Mongoose for interacting with MongoDB.
Cloudinary for uploading and managing resumes.
Google OAuth2 for email notifications to applicants via Gmail.
JWT for user authentication (token-based login).


//Additional Libraries://
dotenv for loading environment variables.
Nodemailer with Google OAuth2 for sending emails.
Cloudinary for image and file storage.


//Setup Instructions//
Prerequisites
Ensure you have the following installed on your local machine:
Node.js (>= 14.x)
MongoDB (MongoDB Compass)
Google Developer Console credentials for OAuth2 (for email notifications)


//Backend Setup//
Clone the repository:
git clone <repository-url>
cd <project-directory>
Install dependencies:
cd backend
npm install

Create a .env file in the backend folder and add the following environment variables:
env
CLIENT_ID=your-google-client-id
CLIENT_SECRET=your-google-client-secret
REDIRECT_URL=your-google-redirect-url
REFRESH_TOKEN=your-google-refresh-token
OAUTH_USER=your-email@example.com
MONGO_URI=your-mongodb-connection-uri
Start the backend server:
npm start


//Frontend Setup//
Navigate to the frontend directory:
cd frontend
Install dependencies:
npm install
Start the frontend development server:
npm start


//Google OAuth configuration://
1. Create OAuth2 Credentials in Google Developer Console
To use Google’s OAuth2 for email, you need to create credentials in the Google Developer Console. Follow these steps:

Create a Project: First, create a project in the Google Developer Console if you haven't already.
Enable Gmail API: Go to the "API Library" section, search for the Gmail API, and enable it. This allows your app to interact with Gmail and send emails.
Create OAuth2 Credentials: In the Credentials section, create OAuth2 credentials for a web application. You’ll need to provide:
Authorized Redirect URI: This is the URL your app will use to handle the OAuth callback (e.g., after the user authorizes access).
Authorized JavaScript origins: Add the URL of your web app that will be using OAuth (e.g., http://localhost:3000 for local development).
Once this is set up, Google will provide you with a Client ID and Client Secret which you will use in your backend to authenticate users and send emails.

2. Set Up the Backend for OAuth2 Authentication
In your backend, you’ll need to configure the OAuth2 flow to send emails using Gmail’s API:

OAuth2 Client Configuration: Using the Client ID and Client Secret from Google, you'll set up an OAuth2 client. This client will be used to authenticate your app with Google.

OAuth2 Tokens: OAuth2 authentication uses access tokens and refresh tokens. The access token is used to authenticate requests to the Gmail API, while the refresh token can be used to get a new access token when the current one expires (usually after one hour).

Access Token: This token is needed every time you make a request to send an email. It expires quickly.
Refresh Token: This token is used to refresh the access token when it expires, so you don’t need to ask the user to re-authenticate frequently.
To get these tokens, you will need to set up an OAuth2 flow that asks the user for permission to send emails on their behalf. Once the user grants permission, you'll receive the refresh token, which you can store securely for future use.

3. Configure Nodemailer to Use Google OAuth2
Nodemailer is a module for sending emails from Node.js. To use Gmail’s SMTP service with Nodemailer, you configure it with OAuth2 credentials:

Set Up Transporter: A transporter in Nodemailer is responsible for sending the email. You need to create a transporter object by configuring it with your Client ID, Client Secret, refresh token, and the access token that you’ve obtained. The transporter will use OAuth2 to authenticate with Gmail and send emails.

Email Sending: Once the transporter is set up, you can use it to send emails, passing the email content, subject, and recipient details as parameters.

4. Handling Token Expiry(usually 7 days)
Access tokens are short-lived. To ensure your app can continue sending emails without interruptions:
Use the refresh token to automatically obtain a new access token when the old one expires. This happens in the background without the user needing to reauthenticate.

5. Secure Your Credentials
It’s critical to keep your Client ID, Client Secret, and Refresh Token secure. These credentials should never be exposed in the frontend or in public repositories. Store them in a .env file in your backend and use environment variables to access them securely.


