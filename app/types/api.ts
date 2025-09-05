export interface ChatResponse {
  type: 'coach' | 'crisis';
  language: string;
  text: string;
  exercise?: string;
}

export interface TTSResponse {
  audioUrl: string;
}

export interface AvatarResponse {
  videoUrl: string;
}

export interface STTResponse {
  text: string;
}

export interface ApiError {
  error: string;
}
