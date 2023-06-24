const express = require("express");
const dotenv = require("dotenv") ;
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.js");
const usersRoute = require("./routes/users.js");
const hotelsRoute = require("./routes/hotels.js");
const roomsRoute = require("./routes/rooms.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
dotenv.config();


// Serve static files
app.use(express.static('public'));

// Render the React app
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const connect = async () => {
  try {
    await mongoose.connect("mongodb://Clusters:9cvG4WzpKTToyugV@ac-rwiul0c-shard-00-00.x0fezpj.mongodb.net:27017,ac-rwiul0c-shard-00-01.x0fezpj.mongodb.net:27017,ac-rwiul0c-shard-00-02.x0fezpj.mongodb.net:27017/Clusters?ssl=true&replicaSet=atlas-anz7l0-shard-0&authSource=admin&retryWrites=true&w=majority");
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// const PORT = 8080

app.listen(8080, () => {
  connect();
  console.log(`Server is running!`);
});
