import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import os from 'os';

export const runtime = "nodejs";

const execAsync = promisify(exec);
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export async function POST(request: NextRequest) {
  let tempFilePath: string | null = null;
  
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Audio file too large. Maximum size is 25MB' },
        { status: 400 }
      );
    }

    // Save the file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create temp file path
    const tempDir = os.tmpdir();
    const fileName = `audio_${Date.now()}.webm`;
    tempFilePath = path.join(tempDir, fileName);
    
    // Write file to temp directory
    await writeFile(tempFilePath, buffer);
    
    // Execute the Python Vosk STT script
    const pythonScript = path.join(process.cwd(), 'python', 'stt_vosk_api.py');
    const { stdout, stderr } = await execAsync(`python3 "${pythonScript}" "${tempFilePath}"`);
    
    if (stderr && !stderr.includes('UserWarning')) {
      console.error('STT script error:', stderr);
    }
    
    // Parse the JSON output
    const result = JSON.parse(stdout);
    
    if (!result.success) {
      throw new Error(result.error || 'Transcription failed');
    }
    
    // Return in OpenAI-compatible format
    return NextResponse.json({ text: result.text });
    
  } catch (error: any) {
    console.error('STT error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to transcribe audio' },
      { status: 500 }
    );
  } finally {
    // Clean up temp file
    if (tempFilePath) {
      try {
        await unlink(tempFilePath);
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  }
}
