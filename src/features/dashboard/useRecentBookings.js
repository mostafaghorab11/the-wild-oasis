import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get('last')
    ? Number(searchParams.get('last'))
    : 7;

  const queryData = subDays(new Date(), numDays).toISOString();

  const { isPending, data: bookings } = useQuery({
    queryKey: ['bookings', `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryData),
  });

  return { isPending, bookings };
}
