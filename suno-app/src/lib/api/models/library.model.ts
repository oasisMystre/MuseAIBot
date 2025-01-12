export type Library = {
  id: string;
  createdAt: string;
  updateAt: string;
  likes: number;
  plays: number;
  data: Audio[];
  status: "text" | "first" | "complete";
};

export type Audio = {
  id: string;
  audioUrl: string;
  sourceAudioUrl: string;
  streamAudioUrl: string;
  sourceStreamAudioUrl: string;
  imageUrl: string;
  prompt: string;
  modelName: string;
  title: string;
  tags: string;
  createTime: string;
  duration: number;
};

export type CreateLibrary = {
  prompt: string;
  instrumental: boolean;
  title?: string;
  isCustom?: boolean;
  tags?: string[];
};
