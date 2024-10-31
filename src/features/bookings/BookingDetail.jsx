import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import useBooking from "./useBooking";
import useCheckout from "../check-in-out/useCheckout";
import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import useDeleteBooking from "../check-in-out/useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const { id: bookingId } = useParams();
  const { isCheckingOut, checkout } = useCheckout();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { isDeletingBooking, deleteBook } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoading) return <Spinner />;
  if (!booking) return <p>No such booking found !!!</p>;
  const status = booking.status;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              disabled={isCheckingOut}
              icon={<HiArrowUpOnSquare />}
              onClick={() =>
                checkout({ id: bookingId, obj: { status: "checked-out" } })
              }
            >
              Check out
            </Button>
          )}
          {status === "checked-out" && (
            <>
              <Modal.Open opens="deletebooking">
                <Button icon={<HiTrash />}>Delete</Button>
              </Modal.Open>
            </>
          )}
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
        <Modal.Window name="deletebooking">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeletingBooking}
            onConfirm={() => {
              deleteBook({ id: bookingId });
              navigate(-1);
            }}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
