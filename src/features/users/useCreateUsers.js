import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditUser } from '../../services/apiUsers';
import { toast } from 'react-hot-toast';

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createUser } = useMutation({
    mutationFn: createEditUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isCreating, createUser };
}
