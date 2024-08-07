export interface AudioProps {
  title: string;
  audioUrl: string;
  author: string;
  imageUrl: string;
  videoId: string;
  channelId: string;
}

export interface AudioContextType {
  audio: AudioProps | undefined;
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
  isBookmarked: boolean | undefined;
  setIsBookmarked: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}
