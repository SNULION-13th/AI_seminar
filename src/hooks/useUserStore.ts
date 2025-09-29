import { useState } from 'react';
import { User } from '../types';
import { findUserByName, toggleUserFollow } from '../utils/userUtils';

export function useUserStore() {
  const [users, setUsers] = useState<User[]>([]);

  const getUser = (userName: string): User => {
    const existingUser = users.find(u => u.name === userName);
    if (existingUser) return existingUser;
    
    const newUser = findUserByName(userName);
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const handleFollow = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? toggleUserFollow(user) : user
      )
    );
    
    return users.find(u => u.id === userId);
  };

  return {
    getUser,
    handleFollow
  };
}