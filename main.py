from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserMessage(BaseModel):
    text: str
    language: str = "en"

class TherapyResponse(BaseModel):
    type: str
    language: str
    text: str
    exercise: Optional[str] = None

@app.post("/chat")
async def chat(message: UserMessage):
    try:
        # Simple response logic for demonstration
        if "help" in message.text.lower() or "crisis" in message.text.lower():
            return TherapyResponse(
                type="crisis",
                language=message.language,
                text="I notice you're asking for help. If you're in immediate danger, please call your local emergency number or crisis hotline."
            )
        
        # Basic CBT-style response
        response = TherapyResponse(
            type="coach",
            language=message.language,
            text=f"I hear you saying '{message.text}'. Let's explore that feeling together.",
            exercise="Take three deep breaths and tell me more about what's on your mind."
        )
        
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
