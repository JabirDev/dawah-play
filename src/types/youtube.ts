export interface ChannelResponse {
  id: string;
  name: string;
  avatar: Image[];
  description: string;
  country: string;
  banner: Image[];
  url: string;
  joined: string;
  is_verified: boolean;
  subscribers: string;
}

export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Video {
  type: string;
  id: string;
  title: string;
  description?: string;
  thumbnails: Image[];
  published?: string;
  view_count: string;
  duration: {
    text: string;
    seconds: number;
  };
}

export interface VideoInPlaylist {
  id: string;
  title: string;
  duration: {
    text: string;
    seconds: number;
  };
}

export interface Playlist {
  type: string;
  id: string;
  title: string;
  description?: string;
  thumbnails: Image[];
  video_count: string;
  first_videos: VideoInPlaylist[];
}

export interface VideoPlaylist {
  id: string;
  index: string;
  title: string;
  thumbnails: Image[];
  info: string;
  duration: { text: string; seconds: number };
}

export interface VideoList {
  current_page: number;
  next_page: number;
  item_page: number;
  total: number;
  items: Video[] | Playlist[] | any;
}
