#!/usr/bin/env python
"""
Simple test script for Kokoro TTS
"""

import sys
print("Testing Kokoro TTS installation...")

try:
    print("Importing kokoro...")
    from kokoro import KPipeline
    print("✓ Kokoro imported successfully")
    
    print("Importing soundfile...")
    import soundfile as sf
    print("✓ Soundfile imported successfully")
    
    print("Importing torch...")
    import torch
    print(f"✓ Torch imported successfully (version: {torch.__version__})")
    
    print("\nInitializing Kokoro pipeline (this may take a moment)...")
    pipeline = KPipeline(lang_code='a')
    print("✓ Pipeline initialized")
    
    # Simple test text
    text = "Hello, this is a test of the Kokoro text to speech system."
    
    print(f"\nGenerating speech for: '{text}'")
    generator = pipeline(text, voice='af_heart')
    
    for i, (gs, ps, audio) in enumerate(generator):
        filename = f'test_output_{i}.wav'
        sf.write(filename, audio, 24000)
        print(f"✓ Saved audio segment {i} to {filename}")
    
    print("\n✅ Kokoro TTS is working correctly!")
    
except ImportError as e:
    print(f"❌ Import error: {e}")
    print("Please ensure all required packages are installed")
    sys.exit(1)
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)