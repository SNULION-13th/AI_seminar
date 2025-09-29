import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (data: {
    title: string;
    description: string;
    category: string;
    imageUrl: string;
  }) => void;
}

export function UploadDialog({ open, onClose, onUpload }: UploadDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const categories = [
    '자연 & 풍경',
    '음식',
    '패션',
    '여행',
    '인테리어',
    '아트',
    '빈티지',
    '도시 & 거리',
    '기타'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !imageUrl) return;

    onUpload({
      title,
      description,
      category,
      imageUrl
    });

    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
    setImageUrl('');
    onClose();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // In a real app, you would handle file upload here
    console.log('File dropped');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            새 핀 만들기
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            이미지와 정보를 입력하여 새로운 핀을 만들어보세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-muted-foreground/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              이미지를 드래그하거나 클릭해서 업로드하세요
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              또는 URL을 입력하세요
            </p>
            <Input
              type="url"
              placeholder="이미지 URL 입력..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="핀의 제목을 입력하세요"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="핀에 대한 설명을 입력하세요"
              rows={3}
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">카테고리 *</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="카테고리를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              취소
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-indigo-700 hover:bg-indigo-800 text-white border-0"
              disabled={!title || !category || !imageUrl}
            >
              업로드
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}