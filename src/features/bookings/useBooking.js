import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooking } from '../../services/apiBookings';

export function useBooking() {
  const { bookingId } = useParams();
  console.log(bookingId);

  const { isPending, data: booking } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
    // refetchOnWindowFocus: false,
  });

  return { isPending, booking };
}