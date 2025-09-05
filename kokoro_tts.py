#!/usr/bin/env python
"""
Kokoro Text-to-Speech Application
A lightweight TTS model with 82M parameters that delivers high-quality speech synthesis.
"""

from kokoro import KPipeline
import soundfile as sf
import torch
import os

def generate_speech(text, output_prefix="output"):
    """
    Generate speech from text using Kokoro TTS model.
    
    Args:
        text: The text to convert to speech
        output_prefix: Prefix for output WAV files (default: "output")
    """
    # Initialize the pipeline
    print("Initializing Kokoro TTS pipeline...")
    pipeline = KPipeline(lang_code='a')
    
    print(f"Generating speech for text:\n{text[:100]}{'...' if len(text) > 100 else ''}")
    
    # Generate audio
    generator = pipeline(text, voice='af_heart')
    
    audio_files = []
    for i, (gs, ps, audio) in enumerate(generator):
        output_file = f'{output_prefix}_{i}.wav'
        print(f"Generated segment {i}: {gs}, {ps}")
        
        # Save audio to file
        sf.write(output_file, audio, 24000)
        audio_files.append(output_file)
        print(f"Saved audio to {output_file}")
    
    return audio_files

def main():
    # Example text
    text = '''
[Kokoro](/kˈOkəɹO/) is an open-weight TTS model with 82 million parameters. 
Despite its lightweight architecture, it delivers comparable quality to larger models 
while being significantly faster and more cost-efficient. With Apache-licensed weights, 
[Kokoro](/kˈOkəɹO/) can be deployed anywhere from production environments to personal projects.
'''
    
    print("Starting Kokoro TTS Demo")
    print("-" * 50)
    
    # Generate speech
    audio_files = generate_speech(text, "kokoro_output")
    
    print("-" * 50)
    print(f"Speech generation complete!")
    print(f"Generated {len(audio_files)} audio file(s):")
    for file in audio_files:
        print(f"  - {file}")
    
    # You can also use custom text
    print("\n" + "="*50)
    custom_text = input("\nEnter your own text (or press Enter to skip): ").strip()
    
    if custom_text:
        print("\nGenerating speech for custom text...")
        custom_files = generate_speech(custom_text, "custom_output")
        print(f"Generated {len(custom_files)} custom audio file(s):")
        for file in custom_files:
            print(f"  - {file}")

if __name__ == "__main__":
    main()