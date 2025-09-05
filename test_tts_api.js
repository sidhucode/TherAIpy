#!/usr/bin/env node
/**
 * Test script for TTS API
 * Run with: node test_tts_api.js
 */

const fs = require('fs');
const path = require('path');

async function testTTSAPI() {
  const API_URL = 'http://localhost:3000/api/tts';
  
  const testText = "Hello from the TherAIpy TTS API. This audio is generated in a temporary directory and cleaned up automatically.";
  
  console.log('Testing TTS API...');
  console.log(`Text: "${testText}"`);
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: testText,
        voice: 'af_heart'
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API Error: ${error.error}`);
    }
    
    // Get audio metadata from headers
    const audioId = response.headers.get('X-Audio-ID');
    const duration = response.headers.get('X-Audio-Duration');
    
    console.log(`✓ Audio generated successfully`);
    console.log(`  Audio ID: ${audioId}`);
    console.log(`  Duration: ${duration} seconds`);
    
    // Save the audio for testing
    const audioBuffer = await response.arrayBuffer();
    const testFile = 'test_api_output.wav';
    fs.writeFileSync(testFile, Buffer.from(audioBuffer));
    console.log(`✓ Audio saved to ${testFile} for testing`);
    
    // Clean up test file after 5 seconds
    setTimeout(() => {
      try {
        fs.unlinkSync(testFile);
        console.log(`✓ Cleaned up test file`);
      } catch (e) {}
    }, 5000);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Check if server is running
console.log('Make sure Next.js server is running (npm run dev)');
console.log('---');

// Run test
testTTSAPI();