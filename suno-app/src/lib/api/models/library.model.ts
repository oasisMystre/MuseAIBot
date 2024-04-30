import { Prompt } from "./prompt.model";

export type Library = {
  id: number;
  createdAt: string;
  updateAt: string;
  likes: number;
  plays: number;
};

export type AudioInfo = {
  id: string;
  title: string;
  image_url: string;
  lyric: string;
  audio_url: string;
  video_url: string;
  created_at: string;
  model_name: string;
  gpt_description_prompt?: string;
  prompt: string;
  status: string;
  type: string;
  tags: string;
  duration: string;
};

export type LibraryAndAudioInfo = {
  library: Library;
  audioInfo: AudioInfo;
};

export type CreateLibrary = {
  prompt: string;
  isInstrumental: boolean;
  title?: string;
  isCustom?: boolean;
  tags?: string[];
  waitAudio?: boolean;
};
