# TherAIpy - Groq API Setup

## Why Groq?
- ⚡ **Ultra-fast inference** (up to 10x faster than OpenAI)
- 🆓 **Free tier available** with generous limits
- 🎯 **High-quality models** (Llama 3, Mixtral, Gemma)
- 🔧 **OpenAI-compatible API** (easy integration)

## Quick Setup (2 minutes)

### 1. Get your Groq API Key
1. Go to https://console.groq.com/keys
2. Sign up for free account
3. Create a new API key
4. Copy the key (starts with `gsk_...`)

### 2. Add to your `.env` file
```bash
GROQ_API_KEY=gsk_...your-key-here...
```

### 3. Restart the servers
```bash
# Stop current servers (Ctrl+C)
# Then restart:
bash run-dev.sh
```

## Available Models

The app is configured to use **Llama 3 8B** by default:
- Fast response time (~200ms)
- Great for conversational AI
- Excellent therapy responses

Other models you can use:
- `mixtral-8x7b-32768` - Larger, more sophisticated
- `gemma-7b-it` - Google's model, good for instructions
- `llama3-70b-8192` - Most powerful, slightly slower

To change model, edit `app/api/chat/route.ts` line 44.

## Testing

1. Go to http://localhost:8080/demo
2. Click microphone and speak
3. You should see:
   - ✅ Transcription (Vosk - local)
   - ✅ AI Response (Groq - API)
   - Voice playback (if TTS configured)

## Fallback Behavior

If no Groq API key is set, the app uses mock responses for common keywords:
- "anxious", "stressed", "sad", "hello", etc.
- Good enough for demos without API

## Rate Limits (Free Tier)

- 30 requests per minute
- 14,400 requests per day
- More than enough for hackathon demo!

## Troubleshooting

If you see "Failed to generate response":
1. Check console for error details
2. Verify API key is correct
3. Check rate limits haven't been exceeded
4. Ensure `.env` file is in the root TherAIpy directory