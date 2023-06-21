import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditUser } from '../../services/apiUsers';
import { toast } from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: updateUser } = useMutation({
    mutationFn: ({ newUserData, id }) => createEditUser(newUserData, id),
    onSuccess: () => {
      toast.success('User successfully edited.');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isEditing, updateUser };
}
