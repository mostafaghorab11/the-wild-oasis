import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi';
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';
function Stats({ bookings, confirmedStays, numDays, numCabins }) {
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

  // occupation rate = number of nights in the confirmed Stays / total nights available in the cabins (number of cabins * number of nights)
  const occupation = confirmedStays.reduce(
    (acc, stay) => acc + stay.numNights,
    0
  );
  const occupationRate = occupation / (numCabins * numDays);
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="bookings"
        color="blue"
        value={bookings.length}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="sales"
        color="green"
        value={formatCurrency(sales)}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="check ins"
        color="indigo"
        value={confirmedStays.length}
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="occupancy rate"
        color="yellow"
        value={Math.round(occupationRate * 100) + ' %'}
      />
    </>
  );
}

export default Stats;
