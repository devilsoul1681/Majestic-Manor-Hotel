import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabinApi } from "../../services/apiCabin";
import toast from "react-hot-toast";

function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin has been deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () => {
      toast.error("Cabin can;t be deleted");
    },
  });
  return { isDeleting, deleteCabin };
}

export default useDeleteCabin;
