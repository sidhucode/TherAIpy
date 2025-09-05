#!/usr/bin/env python
"""
Setup script to download Kokoro models with progress indication
"""

import os
import sys
from huggingface_hub import snapshot_download

print("Setting up Kokoro TTS...")
print("This will download the required models (may take a few minutes)")

# Model repository
model_id = "hexgrad/kokoro-82M"

try:
    print(f"\nDownloading model: {model_id}")
    print("This is a one-time download (~300MB)")
    
    # Download the model with progress bar
    local_dir = snapshot_download(
        repo_id=model_id,
        cache_dir=os.path.expanduser("~/.cache/huggingface"),
        local_dir_use_symlinks=False
    )
    
    print(f"✓ Model downloaded to: {local_dir}")
    print("\nSetup complete! You can now run kokoro_tts.py")
    
except Exception as e:
    print(f"❌ Error downloading model: {e}")
    sys.exit(1)