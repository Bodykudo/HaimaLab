import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';
import { getUserById, getUserByUserId } from '../../services/apiUsers';
import { useParams } from 'react-router-dom';

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return { isLoading, user, isAuthenticated: user?.role === 'authenticated' };
}

export function useUserById(userId) {
  const { isLoading, data: user } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUserByUserId(userId),
  });

  return { isLoading, user };
}

export function useUserProfile() {
  const { userId } = useParams();

  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    retry: false,
  });

  return { isLoading, error, user };
}
