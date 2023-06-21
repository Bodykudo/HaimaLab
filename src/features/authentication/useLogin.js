import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { login as loginAPI } from '../../services/apiAuth';

export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
    },

    onError: (error) => {
      console.log('ERROR', error);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { login, isLoading };
}
