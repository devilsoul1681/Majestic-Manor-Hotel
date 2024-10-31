import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
function useCheckout() {
  const queryClient = useQueryClient();
  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: ({ id, obj }) => updateBooking(id, obj),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} is successfully checked-out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("There is some error while checking in"),
  });
  return { isCheckingOut, checkout };
}

export default useCheckout;
