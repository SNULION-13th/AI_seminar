import { Pin, TabType } from '../types';
import { followingUsers } from '../data/mockData';

export function filterPinsByTab(pins: Pin[], tab: TabType): Pin[] {
  switch (tab) {
    case 'home':
      return pins;
    case 'trending':
      return [...pins].sort((a, b) => b.likes - a.likes);
    case 'following':
      return pins.filter(pin => followingUsers.includes(pin.author.name));
    default:
      return pins;
  }
}

export function filterPinsByCategory(pins: Pin[], category: string): Pin[] {
  if (category === 'all') return pins;
  return pins.filter(pin => pin.category === category);
}

export function filterPinsBySearch(pins: Pin[], searchQuery: string): Pin[] {
  if (!searchQuery.trim()) return pins;
  
  const query = searchQuery.toLowerCase();
  return pins.filter(pin => 
    pin.title.toLowerCase().includes(query) ||
    pin.description?.toLowerCase().includes(query) ||
    pin.category.toLowerCase().includes(query) ||
    pin.author.name.toLowerCase().includes(query)
  );
}

export function generateNewPins(currentPinCount: number, count: number): Pin[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `new-${Date.now()}-${index}`,
    imageUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.random() * 100000000}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080`,
    title: `새로운 핀 ${currentPinCount + index + 1}`,
    description: '새롭게 추가된 아름다운 이미지입니다.',
    author: {
      name: '새로운 작가',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    likes: Math.floor(Math.random() * 200),
    category: ['자연 & 풍경', '음식', '패션', '여행', '인테리어'][Math.floor(Math.random() * 5)],
    isLiked: false,
    isSaved: false
  }));
}

export function togglePinLike(pin: Pin): Pin {
  return {
    ...pin,
    isLiked: !pin.isLiked,
    likes: pin.isLiked ? pin.likes - 1 : pin.likes + 1
  };
}

export function togglePinSave(pin: Pin): Pin {
  return {
    ...pin,
    isSaved: !pin.isSaved
  };
}

export function getUserPins(pins: Pin[], userName: string): Pin[] {
  return pins.filter(pin => pin.author.name === userName);
}

export function getLikedPins(pins: Pin[]): Pin[] {
  // In a real app, this would come from the API
  return pins.filter(pin => pin.isLiked && Math.random() > 0.7);
}