import { User } from '../types';
import { mockUsers } from '../data/mockData';

export function findUserByName(userName: string): User {
  return mockUsers.find(u => u.name === userName) || createDefaultUser(userName);
}

export function createDefaultUser(userName: string): User {
  return {
    id: userName,
    name: userName,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    bio: '안녕하세요! PinShare 사용자입니다.',
    joinedDate: '2024-01-01',
    followersCount: Math.floor(Math.random() * 1000),
    followingCount: Math.floor(Math.random() * 500),
    pinsCount: Math.floor(Math.random() * 100),
    isFollowing: false
  };
}

export function toggleUserFollow(user: User): User {
  return {
    ...user,
    isFollowing: !user.isFollowing,
    followersCount: user.isFollowing 
      ? user.followersCount - 1 
      : user.followersCount + 1
  };
}