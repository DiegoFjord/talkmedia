import { createRequire } from 'module';
const require = createRequire(import.meta.url)

const dotenv = require('dotenv').config();
 const port = process.env.PORT || 5000;

import { errorHandler } from './middleware/errorMiddleware.js'
import { fetchDataAndConsole } from './config/db.js'
import infoRoutes from './routes/infoRoutes.js'; // Assuming the routes file is named infoRoutes.mjs
import { Server } from "socket.io";//

import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const colors = require('colors');
import express from 'express';//

const cors = require("cors");
const path = require('path')
const http = require('http')
const app = express();
const server = http.createServer(app);

console.log(process.env.REACT_APP_ANON_KEY)
// Map used to set user socket and supabase id coralation
const socketMap = new Map(); // Using a Map for better key-value association


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/info', infoRoutes)



app.use(express.static('public', { type: 'module' }));

if (process.env.NODE_ENV === 'production') {

    app.use(express.static(fileURLToPath(new URL("../react_talk/dist", import.meta.url))))
  
    app.get('*', (req, res) =>
      res.sendFile(
         (fileURLToPath(new URL('../react_talk/dist/index.html', import.meta.url)))
)
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }
  

app.use(errorHandler)

//app.use(fetchDataAndConsole)
fetchDataAndConsole('rabbit')

app.use(cors())//

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// socket.io connections and emitions start here
  io.on("connection", (socket) => {

    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("send_user", (data) => {
      console.log(data.person)
      socketMap.set(data.person, socket.id);
      console.log(socketMap)
    });
    socket.on("socket_send_call", (data) => {
      console.log(data.person)
      console.log(data.room)
      console.log(socketMap.get(data.person))
      io.to(socketMap.get(data.person)).emit('socket_recieve_call', {room: data.room});
    });


  });

// shows where the port is located and if its working  
  server.listen(port, () => console.log(`Server started on port ${port}`.cyan.underline));
