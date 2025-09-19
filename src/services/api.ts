import { User } from '../types/User';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const users = await response.json();
    return users.map((user: User) => ({
      ...user,
      liked: false
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const generateAvatarUrl = (username: string): string => {
  return `https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`;
};