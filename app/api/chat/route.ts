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

// Generate therapy response using Groq or fallback to mock
async function generateTherapyResponse(userText: string, messages: any[] = []): Promise<string> {
  // Try Groq first if API key is available
  if (process.env.GROQ_API_KEY) {
    try {
      const groqMessages = [
        { role: 'system', content: THERAPY_SYSTEM_PROMPT },
        ...messages.map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.text || msg.content
        })),
        { role: 'user', content: userText }
      ];

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile', // Updated Llama 3.3 model
          messages: groqMessages,
          temperature: 0.7,
          max_tokens: 150,
          presence_penalty: 0.6,
          frequency_penalty: 0.3
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices[0].message.content;
      } else {
        console.error('Groq API error:', await response.text());
      }
    } catch (error) {
      console.error('Groq API error:', error);
    }
  }

  // Fallback to mock responses for demo/testing
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
  
  if (lowerText.includes('angry') || lowerText.includes('frustrated')) {
    return "I can sense your frustration. It's okay to feel angry. Let's explore what triggered these feelings and how we can work through them together.";
  }
  
  if (lowerText.includes('lonely') || lowerText.includes('alone')) {
    return "Feeling lonely can be really tough. You're not alone in this conversation. What would help you feel more connected right now?";
  }
  
  if (lowerText.includes('hello') || lowerText.includes('hi')) {
    return "Hello! I'm here to listen and support you. How are you feeling today? Take your time to share whatever's on your mind.";
  }
  
  if (lowerText.includes('help')) {
    return "I'm here to support you. Let's work through this together. What would you like to focus on today?";
  }
  
  // Default response
  return "Thank you for sharing that with me. Can you tell me more about how this is affecting you?";
}

export async function POST(request: NextRequest) {
  try {
    const { text, messages = [] } = await request.json();
    
    if (!text) {
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      );
    }

    // Generate response using OpenAI or mock
    const response = await generateTherapyResponse(text, messages);
    
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