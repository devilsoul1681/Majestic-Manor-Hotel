import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useChecking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isChecking, mutate: checkInF } = useMutation({
    mutationFn: ({ id, obj }) => updateBooking(id, obj),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} is confirmed`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("There is some error while checking in"),
  });
  return { isChecking, checkInF };
}

export default useChecking;
