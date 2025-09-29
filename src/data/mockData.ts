import { Pin, User, Comment } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: '김자연',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    bio: '자연과 풍경을 사랑하는 사진작가입니다. 아름다운 순간을 포착하여 공유합니다.',
    location: '서울, 대한민국',
    website: 'https://kimjayeon.com',
    joinedDate: '2023-01-15',
    followersCount: 12500,
    followingCount: 450,
    pinsCount: 89,
    isFollowing: false
  },
  {
    id: '2',
    name: '박요리',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c28dc5fa?w=32&h=32&fit=crop&crop=face',
    bio: '요리와 음식 스타일링을 전문으로 합니다. 맛있는 순간을 기록해요!',
    location: '부산, 대한민국',
    joinedDate: '2023-03-20',
    followersCount: 8900,
    followingCount: 234,
    pinsCount: 156,
    isFollowing: true
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      name: '이댓글러',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    content: '정말 아름다운 사진이네요! 어디서 촬영하신 건가요?',
    createdAt: '2024-01-15T10:30:00Z',
    likes: 12,
    isLiked: false
  },
  {
    id: '2',
    author: {
      name: '최감탄',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
    },
    content: '와! 색감이 정말 환상적이에요 👏',
    createdAt: '2024-01-15T11:15:00Z',
    likes: 8,
    isLiked: true
  }
];

export const initialPins: Pin[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU5MDc0NjAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '아름다운 자연 풍경',
    description: '평화로운 자연의 아름다움을 담은 사진입니다.',
    author: {
      name: '김자연',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    likes: 124,
    category: '자연 & 풍경',
    isLiked: false,
    isSaved: false,
    comments: mockComments
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1532980400857-e8d9d275d858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzU5MDE2ODcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '맛있는 음식 사진',
    description: '정성스럽게 만든 요리의 아름다운 모습',
    author: {
      name: '박요리',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c28dc5fa?w=32&h=32&fit=crop&crop=face'
    },
    likes: 89,
    category: '음식',
    isLiked: false,
    isSaved: true
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4OTk5MzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '스타일리시한 패션',
    description: '최신 트렌드를 반영한 패션 스타일링',
    author: {
      name: '이스타일',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
    },
    likes: 156,
    category: '패션',
    isLiked: false,
    isSaved: false
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1489396160836-2c99c977e970?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NTkwNDM0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '여행지 추천',
    description: '꼭 가봐야 할 아름다운 여행지',
    author: {
      name: '최여행',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    likes: 203,
    category: '여행',
    isLiked: true,
    isSaved: false
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzU5MDM1OTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '모던 인테리어',
    description: '세련되고 깔끔한 홈 인테리어 아이디어',
    author: {
      name: '정인테리어',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
    },
    likes: 67,
    category: '인테리어',
    isLiked: false,
    isSaved: true
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1683659635051-39336c5476b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJ0fGVufDF8fHx8MTc1OTAwOTQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '미니멀 아트',
    description: '단순함 속에서 찾는 아름다움',
    author: {
      name: '한미니멀',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=32&h=32&fit=crop&crop=face'
    },
    likes: 92,
    category: '아트',
    isLiked: false,
    isSaved: false
  },
  {
    id: '7',
    imageUrl: 'https://images.unsplash.com/photo-1497942304796-b8bc2cc898f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYWVzdGhldGljfGVufDF8fHx8MTc1OTA5OTcwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '빈티지 감성',
    description: '옛 추억을 불러일으키는 빈티지 스타일',
    author: {
      name: '송빈티지',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=32&h=32&fit=crop&crop=face'
    },
    likes: 78,
    category: '빈티지',
    isLiked: false,
    isSaved: false
  },
  {
    id: '8',
    imageUrl: 'https://images.unsplash.com/photo-1708352012139-cc209d6f479e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHN0cmVldCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc1OTA3MTUxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '도시의 일상',
    description: '바쁜 도시 속에서 발견한 특별한 순간',
    author: {
      name: '김도시',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=32&h=32&fit=crop&crop=face'
    },
    likes: 134,
    category: '도시 & 거리',
    isLiked: false,
    isSaved: false
  },
  {
    id: '9',
    imageUrl: 'https://images.unsplash.com/photo-1519662978799-2f05096d3636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU5MDU4MjA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '모던 아키텍처',
    description: '현대적이고 세련된 건축 디자인',
    author: {
      name: '김건축',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    likes: 98,
    category: '건축',
    isLiked: false,
    isSaved: false
  },
  {
    id: '10',
    imageUrl: 'https://images.unsplash.com/photo-1687748025388-ce0e6e900805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzU5MDU2MTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '카페 분위기',
    description: '따뜻하고 아늑한 카페의 감성',
    author: {
      name: '박카페',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c28dc5fa?w=32&h=32&fit=crop&crop=face'
    },
    likes: 145,
    category: '라이프스타일',
    isLiked: false,
    isSaved: true
  },
  {
    id: '11',
    imageUrl: 'https://images.unsplash.com/photo-1542435503-956c469947f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1OTA3MTY4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: '미니멀 워크스페이스',
    description: '깔끔하고 효율적인 작업 공간',
    author: {
      name: '이워크',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
    },
    likes: 76,
    category: '인테리어',
    isLiked: true,
    isSaved: false
  }
];

export const followingUsers = ['김자연', '박요리', '이스타일'];

export const categories = [
  { id: 'all', label: '전체' },
  { id: '자연 & 풍경', label: '자연 & 풍경' },
  { id: '음식', label: '음식' },
  { id: '패션', label: '패션' },
  { id: '여행', label: '여행' },
  { id: '인테리어', label: '인테리어' },
  { id: '아트', label: '아트' },
  { id: '빈티지', label: '빈티지' },
  { id: '도시 & 거리', label: '도시 & 거리' },
];