import styled from "styled-components";
import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useCheckIn from "./useCheckIn";
import useGetSettings from "../settings/useGetSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const { isLoading, booking } = useBooking();
  const { isChecking, checkInF } = useCheckIn();
  const [includeBreakfast, setIncludeBreakfast] = useState(false);
  const { isLoading: loadingSettings, userSettings } = useGetSettings();
  const breakfastPrice = userSettings?.breakfastPrice;
  useEffect(
    function () {
      setConfirmedPaid(booking?.isPaid ?? false);
      setIncludeBreakfast(booking?.hasBreakfast ?? false);
    },
    [booking]
  );
  if (isLoading || loadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    numGuests,
    cabinPrice,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;
  const totalPrice = includeBreakfast
    ? numGuests * numNights * breakfastPrice + cabinPrice
    : cabinPrice;

  const extraPrice = includeBreakfast
    ? numGuests * numNights * breakfastPrice
    : 0;
  function handleCheckin() {
    const obj = {
      isPaid: true,
      status: "checked-in",
      hasBreakfast: includeBreakfast,
      extrasPrice: extraPrice,
      totalPrice,
    };
    checkInF({ id: bookingId, obj });
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox
        hasBreakfast={includeBreakfast}
        booking={booking}
        totalPrice={totalPrice}
        extrasPrice={extraPrice}
      />
      <Box>
        <CheckBox
          checked={includeBreakfast}
          disabled={hasBreakfast && isPaid}
          onChange={() => setIncludeBreakfast((set) => !set)}
          id="breakfast"
        >
          {includeBreakfast ? "Remove" : "Include"} the breakfast
        </CheckBox>
      </Box>
      <Box>
        <CheckBox
          checked={confirmedPaid}
          onChange={() => setConfirmedPaid((confirm) => !confirm)}
          id="checking"
        >
          I confirm that {guests.fullName} has paid the total amount{" "}
          {formatCurrency(totalPrice)}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmedPaid || isChecking}>
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
