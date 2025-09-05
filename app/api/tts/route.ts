import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

// Helper to activate venv and run Python command
async function runPythonTTS(text: string): Promise<any> {
  const pythonScript = path.join(process.cwd(), 'python', 'tts_engine.py');
  const venvPython = path.join(process.cwd(), '.venv', 'bin', 'python');
  
  // Escape text for shell command
  const escapedText = text.replace(/'/g, "'\\''");
  
  try {
    const { stdout, stderr } = await execAsync(
      `${venvPython} ${pythonScript} generate '${escapedText}'`,
      { maxBuffer: 1024 * 1024 * 10 } // 10MB buffer
    );
    
    if (stderr && !stderr.includes('Warning')) {
      console.error('TTS stderr:', stderr);
    }
    
    return JSON.parse(stdout);
  } catch (error: any) {
    console.error('TTS execution error:', error);
    throw new Error(`TTS generation failed: ${error.message}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text, voice = 'af_heart' } = await request.json();
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid text parameter' },
        { status: 400 }
      );
    }
    
    // Generate audio using Python TTS engine
    const result = await runPythonTTS(text);
    
    if (!result.success) {
      throw new Error(result.error || 'TTS generation failed');
    }
    
    // Read the audio file
    const audioPath = path.join(process.cwd(), result.filepath);
    const audioBuffer = await fs.readFile(audioPath);
    
    // Schedule cleanup after serving (don't await)
    setTimeout(async () => {
      try {
        await fs.unlink(audioPath);
        console.log(`Cleaned up audio file: ${result.audio_id}`);
      } catch (err) {
        // File might already be deleted
      }
    }, 1000); // Clean up after 1 second
    
    // Return audio file directly
  return new NextResponse(new Uint8Array(audioBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Audio-ID': result.audio_id,
        'X-Audio-Duration': result.duration.toString(),
      },
    });
    
  } catch (error: any) {
    console.error('TTS API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate speech' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve existing audio by ID
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const audioId = searchParams.get('id');
  
  if (!audioId) {
    return NextResponse.json(
      { error: 'Missing audio ID' },
      { status: 400 }
    );
  }
  
  try {
    const audioPath = path.join(process.cwd(), 'temp', 'audio', `${audioId}.wav`);
    const audioBuffer = await fs.readFile(audioPath);
    
  return new NextResponse(new Uint8Array(audioBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Audio not found' },
      { status: 404 }
    );
  }
}