import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteUser as deleteUserAPI } from '../../services/apiUsers';

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: deleteUserAPI,
    onSuccess: () => {
      toast.success('User successfully deleted.');
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteUser };
}
