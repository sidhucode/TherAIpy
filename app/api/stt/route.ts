import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audio = formData.get('audio');

    // TODO: Implement STT using chosen provider (Whisper/Google)
    const text = "Sample transcription";

    return NextResponse.json({ text });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process audio' },
      { status: 500 }
    );
  }
}
