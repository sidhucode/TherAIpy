from flask import Flask, request, jsonify, send_file
from kokoro import KPipeline
import soundfile as sf
import io
import os
import uuid

app = Flask(__name__)

# Initialize the pipeline
print("Initializing Kokoro TTS pipeline...")
pipeline = KPipeline(lang_code='a')

@app.route('/api/tts', methods=['POST'])
def tts():
    data = request.get_json()
    text = data.get('text')
    if not text:
        return jsonify({"error": "Text not provided"}), 400

    print(f"Generating speech for text:\n{text[:100]}{'...' if len(text) > 100 else ''}")

    # Generate audio
    generator = pipeline(text, voice='af_heart')

    # For simplicity, we'll take the first generated audio.
    # In a real application, you might want to handle multiple audio segments.
    try:
        _, _, audio = next(generator)
    except StopIteration:
        return jsonify({"error": "Could not generate audio"}), 500

    # Save to an in-memory buffer
    buffer = io.BytesIO()
    sf.write(buffer, audio, pipeline.sr, format='WAV')
    buffer.seek(0)

    return send_file(
        buffer,
        mimetype='audio/wav',
        as_attachment=False
    )

if __name__ == '__main__':
    app.run(debug=True)
