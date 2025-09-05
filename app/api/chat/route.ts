import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, language = 'en' } = await request.json();

    // TODO: Implement LLM call with CBT system prompt
    const response = {
      type: "coach",
      language,
      text: "Sample response",
      exercise: "Take a deep breath"
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process chat' },
      { status: 500 }
    );
  }
}
