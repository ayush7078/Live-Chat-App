# ChatBot Application - Frontend
This is a real-time group chat application built using React, Socket.IO, and Ant Design. It allows users to set their username, send messages, and receive messages in real-time.

## Features

- **Real-time Messaging**: Uses WebSockets (Socket.IO) for real-time message sending and receiving.
- **Username Setup**: Users must set a username before joining the chat.
- **Grouped Messages by Date**: Messages are grouped by date for better organization.
- **Message Timestamps**: Messages include timestamps to show when they were sent.
- **Responsive UI**: The layout adapts to different screen sizes (desktop, tablet, and mobile).

## Technologies Used

- **React.js**: For building the UI and handling state management.
- **Socket.IO**: For establishing real-time communication between the client and the server.
- **Ant Design**: For UI components like buttons, inputs, and alerts.
- **Moment.js**: For formatting and managing timestamps.
- **CSS**: Custom styles for layout and responsiveness.

## Prerequisites
Before running this project, ensure you have the following installed:

- Node.js (>=14.0.0)
- npm or yarn

## Installation

1. Clone the repository:
   git clone https://github.com/ayush7078/Live-Chat-App.git

2. Navigate to the project directory:
cd Live-Chat-App

3. Install the dependencies:
npm install

4. Running the Application
Start the development server:
npm start

- Open your browser and go to http://localhost:3000 to see the app in action.

# Usage
On the home screen, you will be prompted to enter a username.
Once the username is set, you can start sending and receiving messages in real-time.
Messages will be grouped by date, and each message will show the sender's initials and a timestamp.

# Styling
The application uses custom CSS for styling. Media queries are employed to ensure responsiveness on different screen sizes
