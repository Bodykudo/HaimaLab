import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../services/apiUsers';

export function useAllUsers() {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ['users', 'allUsers'],
    queryFn: getAllUsers,
  });

  return { isLoading, error, users };
}
