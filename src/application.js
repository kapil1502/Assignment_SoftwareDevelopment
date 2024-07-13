require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { initializeWebSocket } = require("./websocket");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  methods: ['GET', 'PUT'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

app.use(cors(corsOptions));

const dishesRoute = require("../routes/dishes");
app.use("/dishes", dishesRoute);

const port = process.env.PORT || 3001;
const server = http.createServer(app);

initializeWebSocket(server);

server.listen(port, () => {
  console.log(`Server running at port ${port}. You can carry on now.`);
});
