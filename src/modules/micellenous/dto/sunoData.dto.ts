export type SunoData = {
  data: {
    callbackType: "text";
    task_id: string;
    data: {
      id: string;
      audio_url: string;
      stream_audio_url: string;
      source_audio_url: string;
      source_stream_audio_url: string;
      image_url: string;
      prompt: string;
      model_name: string;
      title: string;
      tags: string;
      createTime: string;
      duration: number;
    }[];
  };
};
