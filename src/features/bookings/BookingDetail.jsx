import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Heading from '../../ui/Heading';
import Modal from '../../ui/Modal';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import Tag from '../../ui/Tag';
import BookingDataBox from './BookingDataBox';

import { useMoveBack } from '../../hooks/useMoveBack';
import Empty from '../../ui/Empty';
import { useCheckout } from '../check-in-out/useCheckout';
import { useBooking } from './useBooking';
import { useDeleteBooking } from './useDeleteBooking';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();

  const { booking, isPending } = useBooking();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  if (isPending) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #X</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === 'checked-in' && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="deleteBooking">
            <Button variation="danger" onClick={() => deleteBooking(bookingId)}>
              Delete
            </Button>
          </Modal.Open>

          <Modal.Window name="deleteBooking">
            <ConfirmDelete
              resourceName={`booking (${booking.guests.fullName})`}
              onConfirm={() => {
                deleteBooking(bookingId, { onSuccess: () => navigate(-1) });
              }}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
