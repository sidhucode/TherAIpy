import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `You are MindMirror, a supportive wellness coach using CBT-style techniques.
Rules:
- Not a licensed therapist; include a brief reminder once per session
- Keep answers < 120 words, 2-3 steps max
- Prefer actionable: reframes, journaling prompts, breathing, 5-4-3-2-1 grounding
- If user expresses self-harm or crisis, return crisis response`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Check for crisis keywords
    const crisisKeywords = ['suicide', 'kill myself', 'end my life', 'self-harm'];
    const isCrisis = crisisKeywords.some(keyword => message.toLowerCase().includes(keyword));

    if (isCrisis) {
      return NextResponse.json({
        type: 'crisis',
        text: 'I\'m worried about your safety. If you\'re in immediate danger, please call your local emergency number or crisis hotline. You\'re not alone, and help is available.'
      });
    }

    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      max_tokens: 150
    });

    return NextResponse.json({
      type: 'coach',
      text: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
