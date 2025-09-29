import { TabType, EmptyStateMessages } from '../types';

export const TAB_NAMES: Record<TabType, string> = {
  home: '홈',
  trending: '트렌딩',
  following: '팔로잉'
};

export const EMPTY_STATE_MESSAGES: Record<TabType, EmptyStateMessages> = {
  home: {
    message: '핀이 없습니다',
    description: '새로운 핀을 업로드하거나 다른 카테고리를 확인해보세요.'
  },
  trending: {
    message: '트렌딩 핀이 없습니다',
    description: '아직 인기 있는 핀이 없어요. 좋아요를 눌러서 트렌드를 만들어보세요!'
  },
  following: {
    message: '팔로잉 핀이 없습니다',
    description: '팔로우한 사용자들의 새로운 핀을 기다리거나, 새로운 크리에이터를 팔로우해보세요.'
  }
};

export const CURRENT_USER = {
  name: '나',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
};

export const MAX_PINS_BEFORE_STOP_LOADING = 50;
export const PINS_PER_LOAD = 10;
export const LOAD_DELAY_MS = 1500;