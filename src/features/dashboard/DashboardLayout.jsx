import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import { useCabins } from '../cabins/useCabins';
import Stats from './Stats';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPendingCabins, cabins } = useCabins();
  const { isPending, bookings } = useRecentBookings();
  const {
    isPending: isPendingStays,

    confirmedStays,
    numDays,
  } = useRecentStays();

  if (isPending || isPendingStays || isPendingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        numCabins={cabins?.length}
      />
      <p>Today Activity</p>
      <p>Chart stay durations</p>
      <p>Chart sales</p>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
