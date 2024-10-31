import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeletingBooking, mutate: deleteBook } = useMutation({
    mutationFn: ({ id }) => deleteBooking(id),
    onSuccess: (id) => {
      toast.success(`Booking with #${id} is deleted`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Booking can't be deleted");
    },
  });
  return { isDeletingBooking, deleteBook };
}

export default useDeleteBooking;
