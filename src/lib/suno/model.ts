export interface AudioInfo {
  id: string;
  title?: string;
  image_url?: string;
  lyric?: string;
  audio_url?: string;
  video_url?: string;
  created_at: string;
  model_name: string;
  gpt_description_prompt?: string;
  prompt?: string;
  status: string;
  type?: string;
  tags?: string;
  duration?: string;
}

export interface Lyric {
  text: string;
  title: string;
  status: string;
}

