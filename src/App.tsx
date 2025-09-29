import React, { useRef } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { MasonryGrid } from './components/MasonryGrid';
import { UploadDialog } from './components/UploadDialog';
import { PinDetailModal } from './components/PinDetailModal';
import { UserProfileModal } from './components/UserProfileModal';
import { Toaster } from './components/ui/sonner';
import { toast } from "sonner";
import { useKeyboardShortcuts } from './components/hooks/useKeyboardShortcuts';
import { usePinStore } from './hooks/usePinStore';
import { useModalStore } from './hooks/useModalStore';
import { useTheme } from './hooks/useTheme';
import { useUserStore } from './hooks/useUserStore';
import { getUserPins, getLikedPins } from './utils/pinUtils';
import { TAB_NAMES, EMPTY_STATE_MESSAGES } from './utils/constants';

export default function App() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Custom hooks for state management
  const {
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
  } = usePinStore();

  const {
    uploadDialogOpen,
    selectedPin,
    pinDetailOpen,
    selectedUser,
    userProfileOpen,
    openUploadDialog,
    closeUploadDialog,
    openPinDetail,
    closePinDetail,
    openUserProfile,
    closeUserProfile,
    closeAllModals,
    updateSelectedPin
  } = useModalStore();

  const { isDark, toggleTheme } = useTheme();
  const { getUser, handleFollow } = useUserStore();

  // Enhanced event handlers with toast notifications
  const handleLikeWithToast = (id: string) => {
    const pin = pins.find(p => p.id === id);
    if (pin) {
      handleLike(id);
      toast.success(!pin.isLiked ? '좋아요를 눌렀습니다' : '좋아요를 취소했습니다');
    }
  };

  const handleSaveWithToast = (id: string) => {
    const pin = pins.find(p => p.id === id);
    if (pin) {
      handleSave(id);
      toast.success(!pin.isSaved ? '핀을 저장했습니다' : '저장을 취소했습니다');
    }
  };

  const handleTabChangeWithToast = (tab: typeof currentTab) => {
    handleTabChange(tab);
    toast.success(`${TAB_NAMES[tab]} 탭으로 이동했습니다`);
  };

  const handleThemeToggleWithToast = () => {
    toggleTheme();
    toast.success(isDark ? '라이트 모드로 전환했습니다' : '다크 모드로 전환했습니다');
  };

  const handleUploadWithToast = (data: Parameters<typeof handleUpload>[0]) => {
    handleUpload(data);
    toast.success('핀이 성공적으로 업로드되었습니다!');
  };

  const handleCommentWithToast = (pinId: string, content: string) => {
    const newComment = handleComment(pinId, content);
    
    // Update selected pin if it's the same
    if (selectedPin && selectedPin.id === pinId) {
      updateSelectedPin({
        ...selectedPin,
        comments: [...(selectedPin.comments || []), newComment]
      });
    }
    
    toast.success('댓글이 작성되었습니다');
  };

  const handleUserClick = (userId: string) => {
    const user = getUser(userId);
    openUserProfile(user);
  };

  const handleFollowWithToast = (userId: string) => {
    const updatedUser = handleFollow(userId);
    if (updatedUser) {
      toast.success(updatedUser.isFollowing ? '팔로우했습니다' : '팔로우를 취소했습니다');
      
      // Update selected user if it's the same
      if (selectedUser && selectedUser.id === userId) {
        openUserProfile(updatedUser);
      }
    }
  };

  const handlePinClick = (pin: typeof selectedPin) => {
    if (pin) openPinDetail(pin);
  };

  const handleShare = (id: string) => {
    const pin = pins.find(p => p.id === id);
    if (pin) {
      openPinDetail(pin);
      toast.success('공유 옵션을 확인하세요');
    }
  };

  // Enhanced comment like handler
  const handleCommentLikeEnhanced = (commentId: string) => {
    if (selectedPin) {
      handleCommentLike(selectedPin.id, commentId);
      
      // Update local selected pin state
      const updatedComments = selectedPin.comments?.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      );

      updateSelectedPin({
        ...selectedPin,
        comments: updatedComments
      });
    }
  };

  // Focus search input
  const focusSearch = () => {
    searchInputRef.current?.focus();
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSearch: focusSearch,
    onUpload: openUploadDialog,
    onEscape: closeAllModals,
    onThemeToggle: handleThemeToggleWithToast
  });

  const emptyStateMessages = EMPTY_STATE_MESSAGES[currentTab];

  console.log('Number of filtered pins:', filteredPins.length);

  return (
    <div className={`min-h-screen bg-background ${isDark ? 'dark' : ''}`}>
      <Header
        onSearch={handleSearch}
        onUploadClick={openUploadDialog}
        searchQuery={searchQuery}
        setSearchQuery={updateSearchQuery}
        isDark={isDark}
        onThemeToggle={handleThemeToggleWithToast}
        onUserClick={handleUserClick}
        searchInputRef={searchInputRef}
        currentTab={currentTab}
        onTabChange={handleTabChangeWithToast}
      />
      
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <MasonryGrid
        pins={filteredPins}
        onLike={handleLikeWithToast}
        onSave={handleSaveWithToast}
        onShare={handleShare}
        onUserClick={handleUserClick}
        onPinClick={handlePinClick}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        emptyStateMessage={emptyStateMessages.message}
        emptyStateDescription={emptyStateMessages.description}
      />
      
      <UploadDialog
        open={uploadDialogOpen}
        onClose={closeUploadDialog}
        onUpload={handleUploadWithToast}
      />

      <PinDetailModal
        pin={selectedPin}
        isOpen={pinDetailOpen}
        onClose={closePinDetail}
        onLike={handleLikeWithToast}
        onSave={handleSaveWithToast}
        onComment={handleCommentWithToast}
        onCommentLike={handleCommentLikeEnhanced}
        onUserClick={handleUserClick}
      />

      <UserProfileModal
        user={selectedUser}
        userPins={selectedUser ? getUserPins(pins, selectedUser.name) : []}
        likedPins={selectedUser ? getLikedPins(pins) : []}
        isOpen={userProfileOpen}
        onClose={closeUserProfile}
        onFollow={handleFollowWithToast}
        onPinClick={handlePinClick}
        onPinLike={handleLikeWithToast}
      />
      
      <Toaster />
      
      {/* Keyboard shortcuts help overlay */}
      <div className="fixed bottom-4 left-4 z-50 opacity-50 hover:opacity-100 transition-opacity">
        <div className="bg-card border border-border rounded-lg p-3 text-xs space-y-1 max-w-xs">
          <div className="font-medium mb-2">키보드 단축키</div>
          <div><kbd className="bg-muted px-1 rounded">Cmd/Ctrl + K</kbd> 검색</div>
          <div><kbd className="bg-muted px-1 rounded">U</kbd> 업로드</div>
          <div><kbd className="bg-muted px-1 rounded">Esc</kbd> 모달 닫기</div>
          <div><kbd className="bg-muted px-1 rounded">Cmd/Ctrl + Shift + D</kbd> 테마 전환</div>
        </div>
      </div>
    </div>
  );
}