const express = require("express");
const cors = require("cors");
const audioRoutes = require("./api/routes/audioRoutes");

const app = express();
const PORT = 3000;


// Configuración de CORS
app.use(cors({
  origin: "*", // Permitir todas las solicitudes. Cambiar según sea necesario.
  methods: ["GET", "POST"], // Métodos permitidos.
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos.
}));

// Middleware
app.use(express.json());

// Routes
app.use("/audio", audioRoutes);

// Run server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
