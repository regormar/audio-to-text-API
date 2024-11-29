import whisper
import subprocess
import os
import sys
import io  # Import necesario para redirigir stdout correctamente


def convert_to_wav(audio_path):
    wav_path = audio_path.rsplit(".", 1)[0] + ".wav"
    try:
        result = subprocess.run(
            ["ffmpeg", "-i", audio_path, wav_path, "-y"],
            capture_output=True, text=True, check=True
        )
        return wav_path
    except subprocess.CalledProcessError as e:
        return None

def transcribe_audio(audio_path):
    if not audio_path.endswith(".wav"):
        audio_path = convert_to_wav(audio_path)
        if audio_path is None:
            return "Error: No se pudo convertir el archivo de audio."

    if not os.path.exists(audio_path):
        return f"Error: El archivo {audio_path} no existe."

    try:
        model = whisper.load_model("small")
        result = model.transcribe(audio_path, language="es")
        
        if os.path.exists(audio_path):
            os.remove(audio_path)

        return result["text"]

    except Exception as e:
        return f"Error interno en Whisper: {e}"

def save_transcription(transcription, output_path):
    try:
        # Obtener el directorio de 'uploads' y crear la carpeta 'transcriptions' en el mismo nivel
        base_dir = os.path.dirname(os.path.abspath(__file__))  # Directorio actual donde está el script
        transcriptions_folder = os.path.join(base_dir, 'transcriptions')
        
        # Verificar si la carpeta 'transcriptions' existe, si no, crearla
        if not os.path.exists(transcriptions_folder):
            os.makedirs(transcriptions_folder)

        # Cambiar la ruta para guardar en la carpeta 'transcriptions'
        transcription_file = os.path.join(transcriptions_folder, os.path.basename(output_path))

        # Guardar la transcripción en el nuevo archivo
        with open(transcription_file, "w", encoding="utf-8") as f:
            f.write(transcription)
    except Exception as e:
        print(f"Error al guardar la transcripción: {e}")

if __name__ == "__main__":
    # Configurar stdout para UTF-8
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

    if len(sys.argv) < 2:
        print("No se ha proporcionado un archivo de audio.")
        sys.exit(1)

    audio_file = sys.argv[1]

    if not os.path.exists(audio_file):
        print(f"Error: El archivo {audio_file} no existe.")  # Asegúrate de imprimir el error
        sys.exit(1)

    transcription = transcribe_audio(audio_file)

    if "Error" in transcription:
        print(transcription)  # Asegúrate de imprimir el error
        sys.exit(1)

    output_transcription_file = audio_file.rsplit(".", 1)[0] + "_transcription.txt"
    save_transcription(transcription, output_transcription_file)

    # Imprimir la transcripción en stdout para que Node.js la reciba
    print(transcription)
