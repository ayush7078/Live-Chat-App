import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');  // Adjust if deploying to a different server

export default socket;
