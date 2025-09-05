#!/usr/bin/env python
"""
Vosk STT API wrapper for Next.js integration
Handles WebM to WAV conversion and transcription
"""

import sys
import json
import os
import subprocess
import tempfile
from pathlib import Path

# Suppress Vosk logs
os.environ['VOSK_LOG_LEVEL'] = '-1'

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from python.stt_engine import STTEngine

def convert_webm_to_wav(webm_path: str) -> str:
    """
    Convert WebM audio to WAV format using ffmpeg
    
    Args:
        webm_path: Path to WebM file
        
    Returns:
        Path to WAV file
    """
    wav_path = webm_path.replace('.webm', '.wav')
    
    try:
        # Convert using ffmpeg
        cmd = [
            'ffmpeg', '-i', webm_path,
            '-ar', '16000',  # 16kHz sample rate for Vosk
            '-ac', '1',      # Mono
            '-f', 'wav',
            wav_path,
            '-y',  # Overwrite output
            '-loglevel', 'error'  # Suppress ffmpeg output
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode != 0:
            raise Exception(f"FFmpeg error: {result.stderr}")
        
        return wav_path
        
    except Exception as e:
        raise Exception(f"Conversion failed: {str(e)}")

def main():
    if len(sys.argv) < 2:
        print(json.dumps({
            "success": False,
            "error": "No audio file provided"
        }))
        sys.exit(1)
    
    webm_path = sys.argv[1]
    wav_path = None
    
    try:
        # Check if file exists
        if not os.path.exists(webm_path):
            raise Exception(f"Audio file not found: {webm_path}")
        
        # Convert WebM to WAV
        wav_path = convert_webm_to_wav(webm_path)
        
        # Initialize STT engine
        engine = STTEngine()
        
        # Transcribe
        result = engine.transcribe_wav_file(wav_path)
        
        # Output JSON result
        print(json.dumps(result))
        
    except Exception as e:
        print(json.dumps({
            "success": False,
            "error": str(e)
        }))
        
    finally:
        # Clean up WAV file
        if wav_path and os.path.exists(wav_path):
            try:
                os.unlink(wav_path)
            except:
                pass

if __name__ == "__main__":
    main()