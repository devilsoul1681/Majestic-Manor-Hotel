import { useMutation, useQueryClient } from "@tanstack/react-query";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { updateSetting } from "../../services/apiSettings";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import useGetSettings from "./useGetSettings";

function UpdateSettingsForm() {
  const { isLoading, userSettings } = useGetSettings();

  const queryClient = useQueryClient();
  const { isLoading: isUpdatingSettings, mutate: updateSettings } = useMutation(
    {
      mutationFn: updateSetting,
      onSuccess: () => {
        toast.success("Setting has been updated");
        queryClient.invalidateQueries({
          queryKey: ["settings"],
        });
      },
      onError: () => {
        toast.error("Setting can't be updated");
      },
    }
  );

  function handlerChangeSetting(e, newsetting) {
    const x = { ...userSettings, [newsetting]: Number(e.target.value) };
    updateSettings(x);
  }

  if (isLoading) return <Spinner />;
  const {
    breakfastPrice,
    maxBookingLength,
    maxGuestsPerBooking,
    minBookingLength,
  } = userSettings;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdatingSettings}
          defaultValue={minBookingLength}
          onBlur={(e) => handlerChangeSetting(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdatingSettings}
          defaultValue={maxBookingLength}
          onBlur={(e) => handlerChangeSetting(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdatingSettings}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handlerChangeSetting(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdatingSettings}
          defaultValue={breakfastPrice}
          onBlur={(e) => handlerChangeSetting(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
