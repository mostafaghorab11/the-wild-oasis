import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../../services/apiBookings';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterName = searchParams.get('status') || 'all';

  const filter =
    filterName === 'all'
      ? null
      : { field: 'status', method: 'eq', value: filterName };

  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';

  const [field, direction] = sortByRaw.split('-');

  const sortBy = { field, direction };

  const { isPending, data: bookings } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings(filter, sortBy),
  });

  return { isPending, bookings };
}
