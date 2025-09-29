import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Bell, User, Settings, LogOut, Heart, Bookmark, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ThemeToggle } from './ThemeToggle';
import { SearchSuggestions } from './SearchSuggestions';

interface HeaderProps {
  onSearch: (query: string) => void;
  onUploadClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDark: boolean;
  onThemeToggle: () => void;
  onUserClick: (userId: string) => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
  currentTab: 'home' | 'trending' | 'following';
  onTabChange: (tab: 'home' | 'trending' | 'following') => void;
}

export function Header({ 
  onSearch, 
  onUploadClick, 
  searchQuery, 
  setSearchQuery, 
  isDark, 
  onThemeToggle,
  onUserClick,
  searchInputRef,
  currentTab,
  onTabChange
}: HeaderProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleClearRecentSearch = (search: string) => {
    // 최근 검색어 삭제 로직은 SearchSuggestions에서 처리됨
  };

  // 외부 클릭시 제안 숨기기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold">P</span>
          </div>
          <span className="font-semibold text-xl text-foreground">PinShare</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-2">
          <Button 
            variant={currentTab === 'home' ? 'default' : 'ghost'} 
            className={`font-medium px-4 py-2 rounded-full transition-all ${
              currentTab === 'home' 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'hover:bg-muted'
            }`}
            onClick={() => onTabChange('home')}
          >
            홈
          </Button>
          <Button 
            variant={currentTab === 'trending' ? 'default' : 'ghost'} 
            className={`font-medium px-4 py-2 rounded-full transition-all ${
              currentTab === 'trending' 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'hover:bg-muted'
            }`}
            onClick={() => onTabChange('trending')}
          >
            트렌딩
          </Button>
          <Button 
            variant={currentTab === 'following' ? 'default' : 'ghost'} 
            className={`font-medium px-4 py-2 rounded-full transition-all ${
              currentTab === 'following' 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'hover:bg-muted'
            }`}
            onClick={() => onTabChange('following')}
          >
            팔로잉
          </Button>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
          <div className="relative" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="아이디어 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              className="pl-10 w-full rounded-full bg-muted/50"
            />
            <SearchSuggestions
              searchQuery={searchQuery}
              onSelectSuggestion={handleSelectSuggestion}
              onClearRecentSearch={handleClearRecentSearch}
              isVisible={showSuggestions}
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button onClick={onUploadClick} className="rounded-full bg-primary hover:bg-primary/90 text-white border-0">
            <Plus className="h-4 w-4 mr-1" />
            업로드
          </Button>
          
          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5 text-foreground" />
                {/* 알림 배지 */}
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">알림</h3>
                <Button variant="ghost" size="sm" className="text-xs">
                  모두 읽음
                </Button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {/* 알림 아이템들 */}
                <div className="p-3 hover:bg-muted/50 cursor-pointer border-b">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616c28dc5fa?w=32&h=32&fit=crop&crop=face" />
                      <AvatarFallback>박</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">박요리님</span>이 회원님의 핀을 좋아합니다
                      </p>
                      <p className="text-xs text-muted-foreground">2시간 전</p>
                    </div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="p-3 hover:bg-muted/50 cursor-pointer border-b">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" />
                      <AvatarFallback>이</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">이스타일님</span>이 회원님을 팔로우하기 시작했습니다
                      </p>
                      <p className="text-xs text-muted-foreground">5시간 전</p>
                    </div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="p-3 hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" />
                      <AvatarFallback>최</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">최여행님</span>이 회원님의 핀을 저장했습니다
                      </p>
                      <p className="text-xs text-muted-foreground">1일 전</p>
                    </div>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2">
                <Button variant="ghost" className="w-full justify-center text-sm">
                  모든 알림 보기
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                <AvatarFallback>나</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center space-x-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                  <AvatarFallback>나</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">김핀셰어</p>
                  <p className="text-xs text-muted-foreground">pinshare@example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onUserClick('김핀셰어')}>
                <User className="mr-2 h-4 w-4" />
                내 프로필
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Heart className="mr-2 h-4 w-4" />
                좋아요한 핀
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bookmark className="mr-2 h-4 w-4" />
                저장된 핀
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                설정
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                도움말
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  );
}