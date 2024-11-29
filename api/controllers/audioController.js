const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

function transcribeAudio(req, res) {
  const audioPath = path.resolve(req.file.path);

  console.log("Archivo subido:", audioPath); // Log para verificar que el archivo está correctamente subido
  const command = `python -u whisper_transcribe.py "${audioPath.replace(/\\/g, '\\\\')}"`;

  console.log("Comando ejecutado:", command);

  // Ejecutar el script de Whisper
  exec(command, (error, stdout, stderr) => {
    // No eliminar el archivo inmediatamente, espera que termine el proceso
    if (error) {
      console.error("Error ejecutando Whisper:", error);
      return res.status(500).send({ error: "Error procesando el audio" });
    }

    if (stderr && stderr.toLowerCase().includes("error")) {
      console.error("Salida de error de Whisper:", stderr);
      return res.status(500).send({ error: "Error interno en Whisper" });
    }

    console.log("Transcripción completada:", stdout.trim());

    // Eliminar archivo temporal después de que la transcripción ha terminado
    fs.unlinkSync(audioPath); // Eliminar archivo solo después de que se haya procesado correctamente

    // Responder con la transcripción
    res.send({ transcription: stdout.trim() });
  });
}

module.exports = { transcribeAudio };
