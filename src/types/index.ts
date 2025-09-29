export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export interface Pin {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  category: string;
  isLiked?: boolean;
  isSaved?: boolean;
  comments?: Comment[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedDate: string;
  followersCount: number;
  followingCount: number;
  pinsCount: number;
  isFollowing?: boolean;
}

export type TabType = 'home' | 'trending' | 'following';

export interface UploadData {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

export interface EmptyStateMessages {
  message: string;
  description: string;
}