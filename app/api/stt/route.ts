import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get audio from form data
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    
    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // TODO: Implement actual STT using OpenAI Whisper or Google Cloud Speech
    // For now, return a mock response for testing
    
    // Mock implementation - replace with actual STT service
    const mockResponses = [
      "I've been feeling really anxious lately about work",
      "I don't know how to cope with all this stress",
      "Sometimes I feel overwhelmed and don't know what to do",
      "I think I need help managing my emotions",
      "Can you help me understand why I feel this way?"
    ];
    
    const text = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ 
      text,
      confidence: 0.95,
      language: 'en'
    });
    
  } catch (error: any) {
    console.error('STT error:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 }
    );
  }
}
