import { useQuery } from '@tanstack/react-query';
import { getAllDevices } from '../../services/apiDevices';

export function useAllDevices() {
  const {
    isLoading,
    data: devices,
    error,
  } = useQuery({
    queryKey: ['devices', 'allDevices'],
    queryFn: getAllDevices,
  });

  return { isLoading, error, devices };
}
