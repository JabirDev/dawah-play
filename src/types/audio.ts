export interface AudioProps {
  title: string;
  audioUrl: string;
  author: string;
  imageUrl: string;
  videoId: string;
  channelId: string;
  isBookmarked: boolean;
}

export interface AudioContextType {
  audio: AudioProps | undefined;
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
}
