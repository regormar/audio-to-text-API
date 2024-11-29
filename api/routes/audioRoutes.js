const express = require("express");
const multer = require("multer");
const path = require("path");
const { transcribeAudio } = require("../../../audio-to-text-API/api/controllers/audioController"); // Importar la función del controlador

const router = express.Router();

// Configuración de multer para manejar archivos de audio
const upload = multer({ dest: "uploads/" });

// Endpoint para transcribir audios
router.post("/transcribe", upload.single("audio"), transcribeAudio);

module.exports = router;
