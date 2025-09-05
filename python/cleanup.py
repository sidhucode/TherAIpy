#!/usr/bin/env python
"""
Cleanup script for temporary audio files
Can be run periodically via cron or manually
"""

import os
import sys
from pathlib import Path
from datetime import datetime, timedelta

def cleanup_temp_audio(directory="temp/audio", max_age_minutes=5):
    """
    Remove audio files older than max_age_minutes
    """
    temp_dir = Path(directory)
    
    if not temp_dir.exists():
        print(f"Directory {directory} does not exist")
        return
    
    now = datetime.now()
    max_age = timedelta(minutes=max_age_minutes)
    
    removed_count = 0
    total_size = 0
    
    for file in temp_dir.glob("*.wav"):
        file_age = datetime.fromtimestamp(file.stat().st_mtime)
        if now - file_age > max_age:
            size = file.stat().st_size
            try:
                file.unlink()
                removed_count += 1
                total_size += size
                print(f"Removed: {file.name} (age: {now - file_age})")
            except Exception as e:
                print(f"Error removing {file.name}: {e}")
    
    if removed_count > 0:
        print(f"\nCleaned up {removed_count} files ({total_size / 1024:.1f} KB)")
    else:
        print("No files to clean up")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Clean up temporary audio files")
    parser.add_argument("--dir", default="temp/audio", help="Directory to clean")
    parser.add_argument("--age", type=int, default=5, help="Max age in minutes")
    
    args = parser.parse_args()
    
    cleanup_temp_audio(args.dir, args.age)