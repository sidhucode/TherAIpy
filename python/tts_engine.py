#!/usr/bin/env python
"""
TTS Engine for TherAIpy
Handles text-to-speech generation with automatic cleanup
"""

import os
import sys
import json
import uuid
import time
from pathlib import Path
from typing import Optional, Dict, Any
from datetime import datetime, timedelta

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from kokoro import KPipeline
import soundfile as sf

class TTSEngine:
    def __init__(self, temp_dir: str = "temp/audio", cleanup_age_minutes: int = 5):
        """
        Initialize TTS Engine
        
        Args:
            temp_dir: Directory for temporary audio files
            cleanup_age_minutes: Delete files older than this many minutes
        """
        self.temp_dir = Path(temp_dir)
        self.temp_dir.mkdir(parents=True, exist_ok=True)
        self.cleanup_age = timedelta(minutes=cleanup_age_minutes)
        
        # Initialize Kokoro pipeline
        print("Initializing Kokoro TTS pipeline...")
        self.pipeline = KPipeline(lang_code='a')
        
    def cleanup_old_files(self):
        """Remove old audio files from temp directory"""
        now = datetime.now()
        for file in self.temp_dir.glob("*.wav"):
            file_age = datetime.fromtimestamp(file.stat().st_mtime)
            if now - file_age > self.cleanup_age:
                try:
                    file.unlink()
                    print(f"Cleaned up old file: {file.name}")
                except Exception as e:
                    print(f"Error cleaning up {file.name}: {e}")
    
    def generate_audio(self, text: str, voice: str = "af_heart") -> Dict[str, Any]:
        """
        Generate audio from text
        
        Args:
            text: Text to convert to speech
            voice: Voice model to use
            
        Returns:
            Dict with audio file info and metadata
        """
        # Cleanup old files first
        self.cleanup_old_files()
        
        # Generate unique filename
        audio_id = str(uuid.uuid4())
        filename = f"{audio_id}.wav"
        filepath = self.temp_dir / filename
        
        try:
            # Generate audio
            generator = self.pipeline(text, voice=voice)
            
            # Save first segment (for simple single-file output)
            for i, (gs, ps, audio) in enumerate(generator):
                if i == 0:  # Save only first segment for now
                    sf.write(str(filepath), audio, 24000)
                    
                    return {
                        "success": True,
                        "audio_id": audio_id,
                        "filename": filename,
                        "filepath": str(filepath),
                        "sample_rate": 24000,
                        "duration": len(audio) / 24000,
                        "size_bytes": filepath.stat().st_size,
                        "created_at": datetime.now().isoformat()
                    }
                    
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def get_audio_path(self, audio_id: str) -> Optional[Path]:
        """Get path to audio file by ID"""
        filepath = self.temp_dir / f"{audio_id}.wav"
        return filepath if filepath.exists() else None
    
    def delete_audio(self, audio_id: str) -> bool:
        """Delete specific audio file"""
        filepath = self.temp_dir / f"{audio_id}.wav"
        try:
            if filepath.exists():
                filepath.unlink()
                return True
        except Exception:
            pass
        return False

def main():
    """CLI interface for TTS engine"""
    if len(sys.argv) < 2:
        print("Usage: python tts_engine.py <command> [args]")
        print("Commands:")
        print("  generate <text> - Generate audio from text")
        print("  cleanup - Clean up old audio files")
        sys.exit(1)
    
    engine = TTSEngine()
    command = sys.argv[1]
    
    if command == "generate":
        if len(sys.argv) < 3:
            print("Error: Please provide text to generate")
            sys.exit(1)
        
        text = " ".join(sys.argv[2:])
        result = engine.generate_audio(text)
        
        # Output JSON for easy parsing by Next.js
        print(json.dumps(result, indent=2))
        
    elif command == "cleanup":
        engine.cleanup_old_files()
        print("Cleanup complete")
    
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)

if __name__ == "__main__":
    main()