import styled from 'styled-components';

import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

import { useEffect, useState } from 'react';
import { useMoveBack } from '../../hooks/useMoveBack';
import Checkbox from '../../ui/Checkbox';
import Spinner from '../../ui/Spinner';
import { formatCurrency } from '../../utils/helpers';
import BookingDataBox from '../bookings/BookingDataBox';
import { useBooking } from '../bookings/useBooking';
import { useSettings } from '../settings/useSettings';
import { useCheckin } from './useCheckin';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [checkIsPaid, setCheckIsPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { isPending, booking } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isPending: isLoadingSettings } = useSettings();

  useEffect(() => {
    setCheckIsPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  if (isPending || isLoadingSettings) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!checkIsPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setCheckIsPaid(false);
            }}
            disabled={isCheckingIn}
          >
            Add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="idPaid"
          onChange={() => setCheckIsPaid((isPaid) => !isPaid)}
          checked={checkIsPaid}
          disabled={booking.isPaid || isCheckingIn}
        >
          I confirm that {guests?.fullName} has paid the total amount of{' '}
          {addBreakfast
            ? formatCurrency(totalPrice + optionalBreakfastPrice)
            : formatCurrency(totalPrice)}{' '}
          {addBreakfast
            ? `( ${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`
            : ''}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!checkIsPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
