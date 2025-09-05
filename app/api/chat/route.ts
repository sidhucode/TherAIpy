import { NextRequest, NextResponse } from 'next/server';

// CBT Therapy System Prompt
const THERAPY_SYSTEM_PROMPT = `You are a compassionate and professional AI therapist specializing in Cognitive Behavioral Therapy (CBT). Your role is to:

1. Listen actively and empathetically to the user's concerns
2. Help identify negative thought patterns and cognitive distortions
3. Guide users to reframe their thoughts in a more balanced way
4. Suggest practical coping strategies and exercises
5. Encourage self-reflection and emotional awareness

Important guidelines:
- Be warm, supportive, and non-judgmental
- Keep responses concise (2-3 sentences for voice interaction)
- Ask clarifying questions when needed
- Never provide medical advice or diagnoses
- Suggest professional help for serious concerns
- Focus on the present and practical solutions
- Use simple, conversational language

Remember: You are a supportive companion, not a replacement for professional therapy.`;

// Mock therapy responses for testing (replace with actual LLM)
const generateTherapyResponse = (userText: string): string => {
  const lowerText = userText.toLowerCase();
  
  if (lowerText.includes('anxious') || lowerText.includes('anxiety')) {
    return "I hear that you're feeling anxious. Let's take a moment to ground ourselves. Can you tell me what specific thoughts are causing this anxiety?";
  }
  
  if (lowerText.includes('stress') || lowerText.includes('overwhelmed')) {
    return "It sounds like you're dealing with a lot right now. Let's break this down together. What's the most pressing concern on your mind?";
  }
  
  if (lowerText.includes('sad') || lowerText.includes('depressed')) {
    return "I can hear that you're going through a difficult time. Your feelings are valid. What has been weighing on you the most lately?";
  }
  
  if (lowerText.includes('help')) {
    return "I'm here to support you. Let's work through this together. What would you like to focus on today?";
  }
  
  // Default response
  return "Thank you for sharing that with me. Can you tell me more about how this is affecting you?";
};

export async function POST(request: NextRequest) {
  try {
    const { text, messages = [] } = await request.json();
    
    if (!text) {
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      );
    }

    // TODO: Integrate with OpenAI GPT-4 or similar LLM
    // Example integration:
    /*
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: THERAPY_SYSTEM_PROMPT },
        ...messages.map(m => ({ 
          role: m.role, 
          content: m.text 
        })),
        { role: "user", content: text }
      ],
      temperature: 0.7,
      max_tokens: 150, // Keep responses concise for voice
    });
    
    const response = completion.choices[0].message.content;
    */
    
    // For now, use mock responses
    const response = generateTherapyResponse(text);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return NextResponse.json({ 
      response,
      sessionId: `session_${Date.now()}`,
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}