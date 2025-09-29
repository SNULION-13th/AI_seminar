import React, { useState } from 'react';
import { X, Heart, Bookmark, Share, MessageCircle, Download, Flag, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { VisuallyHidden } from './ui/visually-hidden';
import { Textarea } from './ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { CommentSection } from './CommentSection';
import { ShareDialog } from './ShareDialog';

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
  comments?: Comment[];
}

interface Comment {
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

interface PinDetailModalProps {
  pin: Pin | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onComment: (pinId: string, content: string) => void;
  onCommentLike: (commentId: string) => void;
  onUserClick: (userId: string) => void;
}

export function PinDetailModal({
  pin,
  isOpen,
  onClose,
  onLike,
  onSave,
  onComment,
  onCommentLike,
  onUserClick
}: PinDetailModalProps) {
  const [commentText, setCommentText] = useState('');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  if (!pin) return null;

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      onComment(pin.id, commentText);
      setCommentText('');
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pin.imageUrl;
    link.download = `pinshare-${pin.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[95vw] lg:max-w-7xl max-h-[95vh] p-0 overflow-hidden [&>button]:hidden">
          <VisuallyHidden>
            <DialogTitle>{pin.title}</DialogTitle>
            <DialogDescription>
              {pin.description || `${pin.author.name}님의 핀을 자세히 보고 댓글을 남기고 상호작용하세요.`}
            </DialogDescription>
          </VisuallyHidden>
          <div className="flex flex-col lg:flex-row h-full">
            {/* 이미지 섹션 */}
            <div className="flex-1 bg-black flex items-center justify-center min-h-[400px] lg:min-h-[600px]">
              <img
                src={pin.imageUrl}
                alt={pin.title}
                className="max-w-full max-h-full object-contain cursor-zoom-in"
                onClick={() => window.open(pin.imageUrl, '_blank')}
              />
            </div>

            {/* 정보 섹션 */}
            <div className="w-full lg:w-[400px] xl:w-[450px] bg-card flex flex-col">
              {/* 헤더 */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        이미지 다운로드
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Flag className="mr-2 h-4 w-4" />
                        신고하기
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onClose}
                  className="h-9 w-9 hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <Button
                    variant={pin.isLiked ? "default" : "outline"}
                    size="sm"
                    onClick={() => onLike(pin.id)}
                    className="rounded-full h-9 px-4"
                  >
                    <Heart className={`h-4 w-4 mr-2 ${pin.isLiked ? 'fill-current' : ''}`} />
                    {pin.likes}
                  </Button>
                  <Button
                    variant={pin.isSaved ? "default" : "outline"}
                    size="sm"
                    onClick={() => onSave(pin.id)}
                    className="rounded-full h-9 px-4"
                  >
                    <Bookmark className={`h-4 w-4 mr-2 ${pin.isSaved ? 'fill-current' : ''}`} />
                    저장
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShareDialogOpen(true)}
                  className="rounded-full h-9 px-4"
                >
                  <Share className="h-4 w-4 mr-2" />
                  공유
                </Button>
              </div>

              {/* 핀 정보 */}
              <div className="p-4 border-b border-border">
                <h2 className="mb-3">{pin.title}</h2>
                {pin.description && (
                  <p className="text-muted-foreground mb-4 leading-relaxed">{pin.description}</p>
                )}
                
                <div 
                  className="flex items-center space-x-3 cursor-pointer hover:bg-muted/50 rounded-lg p-3 -m-3 transition-colors"
                  onClick={() => onUserClick(pin.author.name)}
                >
                  <Avatar className="h-11 w-11">
                    <AvatarImage src={pin.author.avatar} />
                    <AvatarFallback>{pin.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p>{pin.author.name}</p>
                    <p className="text-sm text-muted-foreground">팔로워 1.2K명</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full px-4">
                    팔로우
                  </Button>
                </div>
              </div>

              {/* 댓글 섹션 */}
              <div className="flex-1 flex flex-col min-h-0">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center space-x-2 mb-4">
                    <MessageCircle className="h-4 w-4" />
                    <span>댓글 {pin.comments?.length || 0}개</span>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Avatar className="h-9 w-9 mt-1">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                      <AvatarFallback>나</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <Textarea
                        placeholder="댓글을 입력하세요..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="min-h-[80px] resize-none border-muted"
                      />
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          onClick={handleCommentSubmit}
                          disabled={!commentText.trim()}
                          className="rounded-full px-4"
                        >
                          댓글 작성
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <CommentSection
                    comments={pin.comments || []}
                    onCommentLike={onCommentLike}
                    onUserClick={onUserClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ShareDialog
        pin={pin}
        isOpen={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
      />
    </>
  );
}