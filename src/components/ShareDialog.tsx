import React, { useState } from 'react';
import { Copy, Facebook, Twitter, MessageSquare, Mail, Link } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

interface Pin {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  author: {
    name: string;
    avatar: string;
  };
}

interface ShareDialogProps {
  pin: Pin;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareDialog({ pin, isOpen, onClose }: ShareDialogProps) {
  const shareUrl = `${window.location.origin}/pin/${pin.id}`;
  const shareText = `${pin.title} - PinShare에서 확인하세요!`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('링크가 클립보드에 복사되었습니다!');
    } catch (err) {
      toast.error('링크 복사에 실패했습니다.');
    }
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToKakaoTalk = () => {
    // KakaoTalk 공유 (실제 구현시 Kakao SDK 필요)
    toast.info('카카오톡 공유 기능은 준비 중입니다.');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`PinShare: ${pin.title}`);
    const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>핀 공유하기</DialogTitle>
          <DialogDescription>
            다양한 방법으로 이 핀을 공유해보세요.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* 미리보기 */}
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <img
              src={pin.imageUrl}
              alt={pin.title}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{pin.title}</p>
              <p className="text-sm text-muted-foreground">by {pin.author.name}</p>
            </div>
          </div>

          {/* 공유 링크 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">공유 링크</label>
            <div className="flex space-x-2">
              <Input value={shareUrl} readOnly className="flex-1" />
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 소셜 미디어 공유 */}
          <div className="space-y-3">
            <label className="text-sm font-medium">소셜 미디어로 공유</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={shareToFacebook}
                className="flex items-center justify-center space-x-2"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
                <span>Facebook</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={shareToTwitter}
                className="flex items-center justify-center space-x-2"
              >
                <Twitter className="h-4 w-4 text-blue-400" />
                <span>Twitter</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={shareToKakaoTalk}
                className="flex items-center justify-center space-x-2"
              >
                <MessageSquare className="h-4 w-4 text-yellow-500" />
                <span>KakaoTalk</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={shareViaEmail}
                className="flex items-center justify-center space-x-2"
              >
                <Mail className="h-4 w-4 text-gray-600" />
                <span>이메일</span>
              </Button>
            </div>
          </div>

          {/* 임베드 코드 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">임베드 코드</label>
            <div className="flex space-x-2">
              <Input
                value={`<iframe src="${shareUrl}/embed" width="300" height="400" frameborder="0"></iframe>`}
                readOnly
                className="flex-1 text-xs"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(`<iframe src="${shareUrl}/embed" width="300" height="400" frameborder="0"></iframe>`);
                  toast.success('임베드 코드가 복사되었습니다!');
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}