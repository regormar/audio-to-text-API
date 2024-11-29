const express = require("express");
const bodyParser = require("body-parser");
const audioRoutes = require("../business-backend/api/routes/audioRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/audio", audioRoutes);

// Run server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
