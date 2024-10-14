import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import { useCabins } from '../cabins/useCabins';
import TodayActivity from '../check-in-out/TodayActivity';
import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
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
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
