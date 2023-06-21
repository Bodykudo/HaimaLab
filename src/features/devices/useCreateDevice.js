import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditDevice } from '../../services/apiDevices';
import { toast } from 'react-hot-toast';

export function useCreateDevice() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createDevice } = useMutation({
    mutationFn: createEditDevice,
    onSuccess: () => {
      toast.success('New device successfully created.');
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isCreating, createDevice };
}
