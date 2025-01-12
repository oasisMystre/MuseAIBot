export type Audio = {
  data: {
    taskId: string;
    parentMusicId: string;
    param: string;
    response: {
      taskId: string;
      sunoData: {
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
      }[];
    };
    status: string;
    type: string;
    errorMessage: string;
    errorCode: number;
  };
};
