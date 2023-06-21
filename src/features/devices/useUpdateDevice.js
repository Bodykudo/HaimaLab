import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditDevice } from '../../services/apiDevices';
import { toast } from 'react-hot-toast';

export function useUpdateDevice() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: updateDevice } = useMutation({
    mutationFn: ({ newDeviceData, id }) => createEditDevice(newDeviceData, id),
    onSuccess: () => {
      toast.success('Device successfully edited.');
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isEditing, updateDevice };
}
