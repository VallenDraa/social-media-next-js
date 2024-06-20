import { type User, type UserProfile } from '@/features/users/types/user.types';

export function userProfileDto(user: User): UserProfile {
  return {
    id: user.id,
    username: user.username,
    profilePicture: user.profilePicture,
    createdAt: user.createdAt,
  };
}
