const express = require("express");
const cors = require("cors");
const audioRoutes = require("./api/routes/audioRoutes");

const app = express();
const PORT = 3000;


// CORS
app.use(cors({
  origin: "*", // Allow all requests.
  methods: ["GET", "POST"], // Allowed methods.
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers.
}));

// Middleware
app.use(express.json());

// Routes
app.use("/audio", audioRoutes);

// Run server
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
