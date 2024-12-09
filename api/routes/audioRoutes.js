const express = require("express");
const multer = require("multer");
const { transcribeAudio } = require("../controllers/audioController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Endpoint para transcribir audios cargados
router.post("/transcribe", upload.single("audio"), transcribeAudio);

// TODO
// Crear un endpoint con la funcionalidad text to speech

module.exports = router;
