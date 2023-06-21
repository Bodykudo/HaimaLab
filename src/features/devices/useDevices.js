import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getDevices } from '../../services/apiDevices';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useDevices() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue, method: 'eq' };

  // Sort
  const sortByRaw = searchParams.get('sortBy') || 'purchaseDate-asc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // Query
  const {
    isLoading,
    data: { data: devices, count } = {},
    error,
  } = useQuery({
    queryKey: ['devices', filter, sortBy, page],
    queryFn: () => getDevices({ filter, sortBy, page }),
  });

  // PRE-FETCHING NEXT PAGE
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['devices', filter, sortBy, page + 1],
      queryFn: () => getDevices({ filter, sortBy, page: page + 1 }),
    });
  }

  // PRE-FETCHING PREVIOUS PAGE
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['devices', filter, sortBy, page - 1],
      queryFn: () => getDevices({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, devices, error, count };
}
