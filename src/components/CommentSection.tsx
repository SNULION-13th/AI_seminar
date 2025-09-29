import React from 'react';
import { Heart, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

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

interface CommentSectionProps {
  comments: Comment[];
  onCommentLike: (commentId: string) => void;
  onUserClick: (userId: string) => void;
}

export function CommentSection({ comments, onCommentLike, onUserClick }: CommentSectionProps) {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return '방금 전';
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}시간 전`;
    return `${Math.floor(diffInMinutes / 1440)}일 전`;
  };

  if (comments.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center text-muted-foreground">
          <p>아직 댓글이 없습니다.</p>
          <p className="text-sm mt-1">첫 번째 댓글을 작성해보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <Avatar 
              className="h-8 w-8 cursor-pointer" 
              onClick={() => onUserClick(comment.author.name)}
            >
              <AvatarImage src={comment.author.avatar} />
              <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="bg-muted rounded-lg p-3">
                <p 
                  className="font-medium text-sm cursor-pointer hover:underline"
                  onClick={() => onUserClick(comment.author.name)}
                >
                  {comment.author.name}
                </p>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{formatTimeAgo(comment.createdAt)}</span>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs hover:bg-transparent"
                  onClick={() => onCommentLike(comment.id)}
                >
                  <Heart className={`h-3 w-3 mr-1 ${comment.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  {comment.likes > 0 && comment.likes}
                </Button>
                
                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs hover:bg-transparent">
                  답글
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-auto p-0 hover:bg-transparent">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>신고하기</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">삭제하기</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}