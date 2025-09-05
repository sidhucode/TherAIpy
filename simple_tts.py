#!/usr/bin/env python
"""
Simple Kokoro TTS script - generates speech without interaction
"""

from kokoro import KPipeline
import soundfile as sf

print("Initializing Kokoro TTS...")
pipeline = KPipeline(lang_code='a')

text = "Hello! This is Kokoro text to speech. It's a lightweight model that delivers high quality speech synthesis."

print(f"Generating speech for: '{text}'")
generator = pipeline(text, voice='af_heart')

for i, (gs, ps, audio) in enumerate(generator):
    filename = f'output_{i}.wav'
    sf.write(filename, audio, 24000)
    print(f"✓ Generated {filename} (sample rate: 24000 Hz)")

print("Done! Check the output WAV files.")