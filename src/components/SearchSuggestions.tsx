import React, { useState, useEffect } from 'react';
import { Search, Clock, TrendingUp, X } from 'lucide-react';
import { Button } from './ui/button';

interface SearchSuggestionsProps {
  searchQuery: string;
  onSelectSuggestion: (suggestion: string) => void;
  onClearRecentSearch: (search: string) => void;
  isVisible: boolean;
}

interface Suggestion {
  type: 'recent' | 'popular' | 'autocomplete';
  text: string;
  count?: number;
}

export function SearchSuggestions({ 
  searchQuery, 
  onSelectSuggestion, 
  onClearRecentSearch,
  isVisible 
}: SearchSuggestionsProps) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  // 인기 검색어 (실제로는 서버에서 가져와야 함)
  const popularSearches = [
    { text: '자연 풍경', count: 1250 },
    { text: '미니멀 인테리어', count: 890 },
    { text: '빈티지 패션', count: 756 },
    { text: '맛있는 음식', count: 645 },
    { text: '여행 사진', count: 534 },
  ];

  // 자동완성 제안 (실제로는 API 호출)
  const getAutocompleteSuggestions = (query: string): string[] => {
    const allSuggestions = [
      '자연 풍경', '자연 사진', '자연 배경',
      '미니멀 디자인', '미니멀 인테리어', '미니멀 아트',
      '빈티지 스타일', '빈티지 패션', '빈티지 카페',
      '음식 사진', '음식 스타일링', '음식 레시피',
      '여행 코스', '여행 준비', '여행 팁',
      '패션 스타일', '패션 트렌드', '패션 코디',
      '인테리어 아이디어', '인테리어 디자인', '인테리어 소품',
      '아트 작품', '아트 갤러리', '아트 전시'
    ];
    
    return allSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5);
  };

  // 로컬 스토리지에서 최근 검색어 불러오기
  useEffect(() => {
    const stored = localStorage.getItem('pinshare-recent-searches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // 최근 검색어 저장
  const addToRecentSearches = (search: string) => {
    const updated = [search, ...recentSearches.filter(s => s !== search)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem('pinshare-recent-searches', JSON.stringify(updated));
  };

  // 최근 검색어 삭제
  const removeFromRecentSearches = (search: string) => {
    const updated = recentSearches.filter(s => s !== search);
    setRecentSearches(updated);
    localStorage.setItem('pinshare-recent-searches', JSON.stringify(updated));
    onClearRecentSearch(search);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    addToRecentSearches(suggestion);
    onSelectSuggestion(suggestion);
  };

  if (!isVisible) return null;

  const autocompleteSuggestions = searchQuery.trim() 
    ? getAutocompleteSuggestions(searchQuery) 
    : [];

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      {/* 자동완성 제안 */}
      {searchQuery.trim() && autocompleteSuggestions.length > 0 && (
        <div className="p-2">
          <div className="text-xs font-medium text-muted-foreground px-3 py-2">
            검색 제안
          </div>
          {autocompleteSuggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-md"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1">{suggestion}</span>
            </button>
          ))}
        </div>
      )}

      {/* 최근 검색어 */}
      {!searchQuery.trim() && recentSearches.length > 0 && (
        <div className="p-2 border-b border-border">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="text-xs font-medium text-muted-foreground">
              최근 검색어
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-auto p-1"
              onClick={() => {
                setRecentSearches([]);
                localStorage.removeItem('pinshare-recent-searches');
              }}
            >
              모두 삭제
            </Button>
          </div>
          {recentSearches.slice(0, 5).map((search, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 px-3 py-2 hover:bg-muted rounded-md group"
            >
              <Clock className="h-4 w-4 text-muted-foreground" />
              <button
                className="flex-1 text-left"
                onClick={() => handleSelectSuggestion(search)}
              >
                {search}
              </button>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 h-auto p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromRecentSearches(search);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* 인기 검색어 */}
      {!searchQuery.trim() && (
        <div className="p-2">
          <div className="text-xs font-medium text-muted-foreground px-3 py-2">
            인기 검색어
          </div>
          {popularSearches.map((search, index) => (
            <button
              key={index}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-md"
              onClick={() => handleSelectSuggestion(search.text)}
            >
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1">{search.text}</span>
              <span className="text-xs text-muted-foreground">
                {search.count?.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* 검색어가 있지만 제안이 없는 경우 */}
      {searchQuery.trim() && autocompleteSuggestions.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">
          <p className="text-sm">검색 제안이 없습니다.</p>
          <button
            className="text-indigo-600 hover:underline text-sm mt-1"
            onClick={() => handleSelectSuggestion(searchQuery)}
          >
            "{searchQuery}" 검색하기
          </button>
        </div>
      )}
    </div>
  );
}