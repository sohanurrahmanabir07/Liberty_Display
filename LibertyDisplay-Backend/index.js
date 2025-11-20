const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const { router } = require('./Routes/route');
const { ConnnectDB } = require('./Database Connection/DB_Connection');
const { Supports } = require('./Model/support');
// const { connectRedis } = require('./Redis/redis');
const redis=require('redis');
const { connectRedis } = require('./Redis/redis');
const client=redis.createClient()
const app = express(); 
const server = http.createServer(app);

// ==== CORS SETUP (Dynamic for Multiple Origins) ====
const allowedOrigins = process.env.URLS.split(',');


app.use(cors({
  origin:allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}))


// ==== EXPRESS MIDDLEWARES ====
app.use(express.json());

// ==== ROUTES ====
app.use('/api', router);

// ==== MONGODB CONNECTION ====
ConnnectDB(); 

// ==== SOCKET.IO SETUP ====
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  },
});

const online = {};

io.on('connection', (socket) => {
  console.log(`A socket user ${socket.id} connected`);

  socket.on('join', (data) => {
    online['admin'] = socket.id;
    console.log('Admin online', online);
  });

  socket.on('sendQueries', async (data) => {
    try {
      console.log('Data', data);
      const newSupport = new Supports(data);
      const result = await newSupport.save();

      if (result) {
        socket.emit('insertedSupport', {
          message: 'Inserted Successfully',
          status: 200,
        });

        if (online['admin']) {
          console.log('Online', online.admin);
          socket.to(online.admin).emit('queries', {
            data: newSupport,
          });
        } else {
          console.log('Admin not online');
        }
      } else {
        socket.emit('insertedSupport', {
          message: 'Insertion Failed',
          status: 401,
        });
      }
    } catch (error) {
      console.log(error.message);
      socket.emit('insertedSupport', {
        message: 'Server Error',
        status: 500,
      });
    }
  });
});

// ==== GLOBAL ERROR HANDLER (Ensures CORS on errors) ====
app.use((err, req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.status(err.status || 500).json({ message: err.message });
});

// ==== PORT LISTEN ====
const port = process.env.Port || 3500;
server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});