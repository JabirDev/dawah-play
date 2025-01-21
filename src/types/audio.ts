export interface AudioProps {
  title: string;
  author: string;
  imageUrl: string;
  videoId: string;
  channelId: string;
}

export interface AudioContextType {
  audio: AudioProps | undefined;
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
  isSaved: boolean | undefined;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}
