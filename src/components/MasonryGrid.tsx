import React, { useEffect, useRef } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageCard } from './ImageCard';
import { Spinner } from './ui/spinner';
import { Pin } from '../types';

interface MasonryGridProps {
  pins: Pin[];
  onLike: (id: string) => void;
  onSave?: (id: string) => void;
  onShare?: (id: string) => void;
  onUserClick?: (userId: string) => void;
  onPinClick?: (pin: Pin) => void;
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  emptyStateMessage?: string;
  emptyStateDescription?: string;
}

export function MasonryGrid({ 
  pins, 
  onLike, 
  onSave = () => {},
  onShare = () => {},
  onUserClick = () => {},
  onPinClick = () => {},
  loading = false,
  hasMore = false,
  onLoadMore = () => {},
  emptyStateMessage = '핀이 없습니다',
  emptyStateDescription = '새로운 핀을 업로드하거나 다른 카테고리를 확인해보세요.'
}: MasonryGridProps) {
  console.log('Number of pins:', pins.length);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-muted rounded-2xl h-64 mb-3"></div>
              <div className="bg-muted rounded h-4 w-3/4 mb-2"></div>
              <div className="bg-muted rounded h-3 w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (pins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">📌</span>
        </div>
        <h3 className="mb-2">{emptyStateMessage}</h3>
        <p className="text-muted-foreground max-w-md">{emptyStateDescription}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          1200: 4,
          1600: 5
        }}
      >
        <Masonry gutter="16px">
          {pins.map((pin) => (
            <ImageCard
              key={pin.id}
              pin={pin}
              onLike={onLike}
              onSave={onSave}
              onShare={onShare}
              onUserClick={onUserClick}
              onClick={onPinClick}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      
      {/* Infinite scroll trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {loading && <Spinner size="lg" />}
        </div>
      )}
    </div>
  );
}