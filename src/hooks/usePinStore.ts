import { useState, useMemo, useEffect } from 'react';
import { Pin, Comment, TabType, UploadData } from '../types';
import { initialPins, followingUsers } from '../data/mockData';
import { 
  filterPinsByTab, 
  filterPinsByCategory, 
  filterPinsBySearch, 
  generateNewPins,
  togglePinLike,
  togglePinSave
} from '../utils/pinUtils';
import { CURRENT_USER, MAX_PINS_BEFORE_STOP_LOADING, PINS_PER_LOAD, LOAD_DELAY_MS } from '../utils/constants';

export function usePinStore() {
  const [pins, setPins] = useState<Pin[]>(initialPins);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulate initial data load
    return () => clearTimeout(timer);
  }, []);

  const filteredPins = useMemo(() => {
    let filtered = filterPinsByTab(pins, currentTab);
    filtered = filterPinsByCategory(filtered, selectedCategory);
    filtered = filterPinsBySearch(filtered, searchQuery);
    return filtered;
  }, [pins, selectedCategory, searchQuery, currentTab]);

  const handleTabChange = (tab: TabType) => {
    setCurrentTab(tab);
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('all');
  };

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const handleLike = (id: string) => {
    setPins(prevPins => 
      prevPins.map(pin => 
        pin.id === id ? togglePinLike(pin) : pin
      )
    );
  };

  const handleSave = (id: string) => {
    setPins(prevPins => 
      prevPins.map(pin => 
        pin.id === id ? togglePinSave(pin) : pin
      )
    );
  };

  const handleUpload = (data: UploadData) => {
    const newPin: Pin = {
      id: Date.now().toString(),
      imageUrl: data.imageUrl,
      title: data.title,
      description: data.description,
      author: CURRENT_USER,
      likes: 0,
      category: data.category,
      isLiked: false,
      isSaved: false
    };

    setPins(prev => [newPin, ...prev]);
  };

  const handleLoadMore = async () => {
    if (loading) return;
    
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, LOAD_DELAY_MS));
    
    const newPins = generateNewPins(pins.length, PINS_PER_LOAD);
    setPins(prev => [...prev, ...newPins]);
    setLoading(false);
    
    if (pins.length > MAX_PINS_BEFORE_STOP_LOADING) {
      setHasMore(false);
    }
  };

  const handleComment = (pinId: string, content: string): Comment => {
    const newComment: Comment = {
      id: Date.now().toString(),
      author: CURRENT_USER,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };

    setPins(prevPins => 
      prevPins.map(pin => 
        pin.id === pinId 
          ? { ...pin, comments: [...(pin.comments || []), newComment] }
          : pin
      )
    );

    return newComment;
  };

  const handleCommentLike = (pinId: string, commentId: string) => {
    setPins(prevPins =>
      prevPins.map(pin => {
        if (pin.id !== pinId) return pin;
        
        const updatedComments = pin.comments?.map(comment =>
          comment.id === commentId
            ? {
                ...comment,
                isLiked: !comment.isLiked,
                likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
              }
            : comment
        );

        return { ...pin, comments: updatedComments };
      })
    );
  };

  return {
    pins,
    filteredPins,
    selectedCategory,
    searchQuery,
    currentTab,
    loading,
    hasMore,
    setSelectedCategory,
    updateSearchQuery,
    handleTabChange,
    handleSearch,
    handleLike,
    handleSave,
    handleUpload,
    handleLoadMore,
    handleComment,
    handleCommentLike
  };
}