import React, { useState, useRef, useEffect } from 'react';
import { Heart, Share, MoreHorizontal, Download, Bookmark, Flag } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ImageWithFallback } from './figma/ImageWithFallback';

import { Pin } from '../types';

interface ImageCardProps {
  pin: Pin;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onShare: (id: string) => void;
  onUserClick: (userId: string) => void;
  onClick: (pin: Pin) => void;
}

export function ImageCard({ 
  pin,
  onLike,
  onSave,
  onShare,
  onUserClick,
  onClick
}: ImageCardProps) {
  const { id, imageUrl, title, description, author, likes, category, isLiked = false, isSaved = false } = pin;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `pinshare-${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="relative group cursor-pointer break-inside-avoid mb-4 rounded-2xl overflow-hidden bg-card shadow-sm hover:shadow-lg transition-shadow duration-200"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
      onClick={() => onClick(pin)}
    >
      {/* Image */}
      <div className="relative" ref={imgRef}>
        {isInView ? (
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-auto object-cover"
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="w-full h-64 bg-muted animate-pulse" />
        )}
        
        {/* Overlay on hover */}
        {showOverlay && imageLoaded && (
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {/* Top actions */}
            <div className="flex justify-end space-x-2">
              <Button
                size="sm"
                variant={isSaved ? "default" : "secondary"}
                className="rounded-full bg-black/80 backdrop-blur-sm hover:bg-black/90 text-white border-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onSave(id);
                }}
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="rounded-full bg-black/80 backdrop-blur-sm hover:bg-black/90 text-white border border-white/20 inline-flex items-center justify-center h-8 px-3 text-sm font-medium transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    onShare(id);
                  }}>
                    <Share className="h-4 w-4 mr-2" />
                    공유하기
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    handleDownload();
                  }}>
                    <Download className="h-4 w-4 mr-2" />
                    다운로드
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Flag className="h-4 w-4 mr-2" />
                    신고하기
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Bottom actions */}
            <div className="flex justify-between items-end">
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full bg-black/80 backdrop-blur-sm hover:bg-black/90 text-white border-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(id);
                }}
              >
                <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                {likes}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-medium text-sm mb-1 line-clamp-2">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{description}</p>
        )}
        
        {/* Author */}
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 rounded-lg p-1 -m-1"
          onClick={(e) => {
            e.stopPropagation();
            onUserClick(author.name);
          }}
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src={author.avatar} />
            <AvatarFallback className="text-xs">{author.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground hover:text-foreground transition-colors">{author.name}</span>
        </div>
        
        {/* Category tag */}
        <div className="mt-2">
          <span className="inline-block px-2 py-1 text-xs bg-muted rounded-full text-muted-foreground">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}