import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteDevice as deleteDeviceAPI } from '../../services/apiDevices';

export function useDeleteDevice() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteDevice } = useMutation({
    mutationFn: deleteDeviceAPI,
    onSuccess: () => {
      toast.success('Device successfully deleted.');
      queryClient.invalidateQueries({
        queryKey: ['devices'],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteDevice };
}
