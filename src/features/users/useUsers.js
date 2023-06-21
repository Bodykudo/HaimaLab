import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUsers } from '../../services/apiUsers';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useUsers(userRole) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get('sex');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'sex', value: filterValue, method: 'eq' };

  // Sort
  const sortByRaw = searchParams.get('sortBy') || 'fullName-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // Query
  const {
    isLoading,
    data: { data: users, count } = {},
    error,
  } = useQuery({
    queryKey: ['users', userRole, filter, sortBy, page],
    queryFn: () => getUsers({ filter, sortBy, page, userRole }),
  });

  // PRE-FETCHING NEXT PAGE
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['users', filter, sortBy, page + 1],
      queryFn: () => getUsers({ filter, sortBy, page: page + 1, userRole }),
    });
  }

  // PRE-FETCHING PREVIOUS PAGE
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['users', filter, sortBy, page - 1],
      queryFn: () => getUsers({ filter, sortBy, page: page - 1, userRole }),
    });
  }

  return { isLoading, users, error, count };
}
