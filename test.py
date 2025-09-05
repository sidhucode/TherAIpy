from transformers import AutoProcessor, AutoModelForTextToSpeech
import torch

# Load the processor and the model
processor = AutoProcessor.from_pretrained("microsoft/VibeVoice-1.5B")
model = AutoModelForTextToSpeech.from_pretrained("microsoft/VibeVoice-1.5B", torch_dtype="auto")