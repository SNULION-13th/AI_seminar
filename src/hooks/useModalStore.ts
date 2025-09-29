import { useState } from 'react';
import { Pin, User } from '../types';

export function useModalStore() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [pinDetailOpen, setPinDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userProfileOpen, setUserProfileOpen] = useState(false);

  const openUploadDialog = () => setUploadDialogOpen(true);
  const closeUploadDialog = () => setUploadDialogOpen(false);

  const openPinDetail = (pin: Pin) => {
    setSelectedPin(pin);
    setPinDetailOpen(true);
  };

  const closePinDetail = () => {
    setPinDetailOpen(false);
    setSelectedPin(null);
  };

  const openUserProfile = (user: User) => {
    setSelectedUser(user);
    setUserProfileOpen(true);
    setPinDetailOpen(false); // Close pin detail if open
  };

  const closeUserProfile = () => {
    setUserProfileOpen(false);
    setSelectedUser(null);
  };

  const closeAllModals = () => {
    setUploadDialogOpen(false);
    setPinDetailOpen(false);
    setUserProfileOpen(false);
    setSelectedPin(null);
    setSelectedUser(null);
  };

  const updateSelectedPin = (updatedPin: Pin) => {
    setSelectedPin(updatedPin);
  };

  return {
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
  };
}