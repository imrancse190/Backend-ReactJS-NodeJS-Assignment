const express = require("express");
const bodyParser = require("body-parser");
const hotelRoutes = require("./routes/hotelRoutes");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3006", // restrict CORS to this origin
  optionsSuccessStatus: 200, // some legacy browsers require this
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/hotel", hotelRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
