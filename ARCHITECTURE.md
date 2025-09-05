# TherAIpy Architecture

## System Flow
```
User Voice → Browser Mic → STT → AI Chat → TTS → Audio Playback
```

## API Endpoints

### 1. Speech-to-Text (STT)
- **Endpoint**: `POST /api/stt`
- **Input**: Audio blob (webm/wav)
- **Output**: `{ text: string, confidence?: number }`
- **Provider Options**: OpenAI Whisper, Google Cloud Speech

### 2. Chat/Therapy AI
- **Endpoint**: `POST /api/chat`
- **Input**: `{ text: string, sessionId?: string }`
- **Output**: `{ response: string, sessionId: string }`
- **Provider**: OpenAI GPT-4 with CBT therapy prompt

### 3. Text-to-Speech (TTS)
- **Endpoint**: `POST /api/tts`
- **Input**: `{ text: string }`
- **Output**: Audio stream (WAV)
- **Provider**: Kokoro (implemented)

### 4. Avatar (Optional)
- **Endpoint**: `POST /api/avatar`
- **Input**: `{ text: string, emotion?: string }`
- **Output**: `{ videoUrl: string }`
- **Provider**: D-ID or HeyGen

## Frontend Components

### Audio Capture
```javascript
// Browser MediaRecorder setup
navigator.mediaDevices.getUserMedia({ audio: true })
MediaRecorder with webm/opus codec
Send chunks to STT API
```

### Audio Playback
```javascript
// Direct audio playback
const audio = new Audio(audioUrl);
audio.play();
```

## Performance Optimizations

### 1. Model Preloading
- Kokoro TTS model stays loaded in memory
- Consider persistent Python process

### 2. Audio Streaming
- Stream TTS audio chunks as generated
- Reduce latency vs file-based approach

### 3. Session Management
- Maintain conversation context
- Store temporary transcripts
- No PII retention

## Session State
```typescript
interface SessionState {
  id: string;
  transcript: Message[];
  startTime: Date;
  lastActivity: Date;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  audioUrl?: string;
}
```

## Security Considerations
- Audio files auto-delete after 5 minutes
- No long-term storage of recordings
- Session data expires after inactivity
- HTTPS required for microphone access

## Next Steps Implementation Priority

1. **Phase 1: Core Voice Loop**
   - [ ] Browser audio capture
   - [ ] STT integration
   - [ ] Chat API with therapy prompt
   - [ ] Wire up complete flow

2. **Phase 2: Optimization**
   - [ ] Audio streaming
   - [ ] Reduce latency
   - [ ] Session persistence

3. **Phase 3: Enhanced Features**
   - [ ] Avatar integration
   - [ ] Emotion detection
   - [ ] Therapy progress tracking