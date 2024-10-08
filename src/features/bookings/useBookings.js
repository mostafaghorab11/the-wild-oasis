import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../../services/apiBookings';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterName = searchParams.get('status') || 'all';

  // FILTER
  const filter =
    filterName === 'all'
      ? null
      : { field: 'status', method: 'eq', value: filterName };

  // SORT
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const { isPending, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });

  return { isPending, bookings, count };
}
