#!/usr/bin/env python
"""
STT Engine for TherAIpy using Vosk
Handles speech-to-text transcription
"""

import os
import sys
import json
import wave
import io
from pathlib import Path
from typing import Dict, Any

# Suppress Vosk debug output
os.environ['VOSK_LOG_LEVEL'] = '-1'

import vosk

class STTEngine:
    def __init__(self, model_path: str = None):
        """
        Initialize Vosk STT Engine
        
        Args:
            model_path: Path to Vosk model directory
        """
        if model_path is None:
            # Use default model path
            model_path = Path(__file__).parent.parent / "models" / "vosk-model-small-en-us-0.15"
        
        if not Path(model_path).exists():
            raise ValueError(f"Model not found at {model_path}. Run download_vosk_model.py first.")
        
        # Initialize Vosk model
        self.model = vosk.Model(str(model_path))
        
    def transcribe_audio(self, audio_data: bytes, sample_rate: int = 16000) -> Dict[str, Any]:
        """
        Transcribe audio bytes to text
        
        Args:
            audio_data: Audio bytes (WAV or raw PCM)
            sample_rate: Sample rate (default 16000 Hz)
            
        Returns:
            Dict with transcription results
        """
        try:
            # Create recognizer with sample rate
            rec = vosk.KaldiRecognizer(self.model, sample_rate)
            rec.SetMaxAlternatives(0)
            rec.SetWords(True)
            
            # Process audio
            if rec.AcceptWaveform(audio_data):
                result = json.loads(rec.Result())
            else:
                result = json.loads(rec.FinalResult())
            
            # Extract text and confidence
            text = result.get('text', '')
            
            # Calculate average confidence from word confidences
            confidence = 1.0
            if 'result' in result and result['result']:
                confidences = [w.get('conf', 1.0) for w in result['result']]
                confidence = sum(confidences) / len(confidences) if confidences else 1.0
            
            return {
                "success": True,
                "text": text,
                "confidence": confidence,
                "language": "en"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def transcribe_wav_file(self, wav_path: str) -> Dict[str, Any]:
        """
        Transcribe a WAV file
        
        Args:
            wav_path: Path to WAV file
            
        Returns:
            Dict with transcription results
        """
        try:
            with wave.open(wav_path, 'rb') as wf:
                # Check if file is mono 16kHz
                if wf.getnchannels() != 1:
                    return {
                        "success": False,
                        "error": "Please provide mono audio (single channel)"
                    }
                
                sample_rate = wf.getframerate()
                audio_data = wf.readframes(wf.getnframes())
                
                return self.transcribe_audio(audio_data, sample_rate)
                
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

def convert_webm_to_wav(webm_data: bytes) -> bytes:
    """
    Convert WebM audio to WAV format using ffmpeg
    
    Args:
        webm_data: WebM audio bytes
        
    Returns:
        WAV audio bytes
    """
    import subprocess
    import tempfile
    
    # Create temp files
    with tempfile.NamedTemporaryFile(suffix='.webm', delete=False) as webm_file:
        webm_file.write(webm_data)
        webm_path = webm_file.name
    
    wav_path = webm_path.replace('.webm', '.wav')
    
    try:
        # Convert using ffmpeg
        cmd = [
            'ffmpeg', '-i', webm_path,
            '-ar', '16000',  # 16kHz sample rate
            '-ac', '1',      # Mono
            '-f', 'wav',
            wav_path,
            '-y'  # Overwrite output
        ]
        
        subprocess.run(cmd, capture_output=True, check=True)
        
        # Read WAV data
        with open(wav_path, 'rb') as f:
            wav_data = f.read()
        
        return wav_data
        
    finally:
        # Cleanup temp files
        if os.path.exists(webm_path):
            os.unlink(webm_path)
        if os.path.exists(wav_path):
            os.unlink(wav_path)

def main():
    """CLI interface for STT engine"""
    if len(sys.argv) < 2:
        print("Usage: python stt_engine.py <command> [args]")
        print("Commands:")
        print("  transcribe <wav_file> - Transcribe WAV file")
        print("  test - Test with sample audio")
        sys.exit(1)
    
    engine = STTEngine()
    command = sys.argv[1]
    
    if command == "transcribe":
        if len(sys.argv) < 3:
            print("Error: Please provide WAV file path")
            sys.exit(1)
        
        wav_path = sys.argv[2]
        result = engine.transcribe_wav_file(wav_path)
        
        # Output JSON for easy parsing
        print(json.dumps(result, indent=2))
        
    elif command == "test":
        # Test with a simple message
        print("STT Engine initialized successfully")
        print(f"Model loaded from: {engine.model}")
        
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)

if __name__ == "__main__":
    main()