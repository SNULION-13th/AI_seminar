import React, { useState } from 'react';
import { X, MapPin, Calendar, Link as LinkIcon, MoreHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { VisuallyHidden } from './ui/visually-hidden';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { MasonryGrid } from './MasonryGrid';

interface User {
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

interface Pin {
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
}

interface UserProfileModalProps {
  user: User | null;
  userPins: Pin[];
  likedPins: Pin[];
  isOpen: boolean;
  onClose: () => void;
  onFollow: (userId: string) => void;
  onPinClick: (pin: Pin) => void;
  onPinLike: (pinId: string) => void;
}

export function UserProfileModal({
  user,
  userPins,
  likedPins,
  isOpen,
  onClose,
  onFollow,
  onPinClick,
  onPinLike
}: UserProfileModalProps) {
  const [activeTab, setActiveTab] = useState('pins');

  if (!user) return null;

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long'
    });
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>{user.name}님의 프로필</DialogTitle>
          <DialogDescription>
            {user.bio || `${user.name}님의 핀과 활동을 확인하고 팔로우하세요.`}
          </DialogDescription>
        </VisuallyHidden>
        <div className="flex flex-col h-full">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">{user.name}님의 프로필</h2>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>프로필 공유</DropdownMenuItem>
                  <DropdownMenuItem>사용자 차단</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">신고하기</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 프로필 정보 */}
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-bold mb-2">{user.name}</h3>
                
                {user.bio && (
                  <p className="text-muted-foreground mb-3">{user.bio}</p>
                )}
                
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-sm text-muted-foreground mb-4">
                  {user.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatJoinDate(user.joinedDate)} 가입</span>
                  </div>
                  
                  {user.website && (
                    <div className="flex items-center space-x-1">
                      <LinkIcon className="h-4 w-4" />
                      <a 
                        href={user.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-indigo-600 hover:underline"
                      >
                        웹사이트
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center sm:justify-start items-center space-x-6 mb-4">
                  <div className="text-center">
                    <p className="font-semibold">{formatCount(user.pinsCount)}</p>
                    <p className="text-sm text-muted-foreground">핀</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{formatCount(user.followersCount)}</p>
                    <p className="text-sm text-muted-foreground">팔로워</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{formatCount(user.followingCount)}</p>
                    <p className="text-sm text-muted-foreground">팔로잉</p>
                  </div>
                </div>
                
                <div className="flex justify-center sm:justify-start space-x-2">
                  <Button
                    variant={user.isFollowing ? "outline" : "default"}
                    onClick={() => onFollow(user.id)}
                    className="px-6"
                  >
                    {user.isFollowing ? '팔로잉' : '팔로우'}
                  </Button>
                  <Button variant="outline">메시지</Button>
                </div>
              </div>
            </div>
          </div>

          {/* 탭 컨텐츠 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="mx-6 mb-4">
              <TabsTrigger value="pins">핀 ({formatCount(userPins.length)})</TabsTrigger>
              <TabsTrigger value="liked">좋아요 ({formatCount(likedPins.length)})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pins" className="flex-1 m-0">
              {userPins.length > 0 ? (
                <div className="px-6 pb-6 h-full overflow-auto">
                  <MasonryGrid
                    pins={userPins}
                    onLike={onPinLike}
                    onPinClick={onPinClick}
                    loading={false}
                  />
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>아직 업로드한 핀이 없습니다.</p>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="liked" className="flex-1 m-0">
              {likedPins.length > 0 ? (
                <div className="px-6 pb-6 h-full overflow-auto">
                  <MasonryGrid
                    pins={likedPins}
                    onLike={onPinLike}
                    onPinClick={onPinClick}
                    loading={false}
                  />
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>아직 좋아요한 핀이 없습니다.</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}