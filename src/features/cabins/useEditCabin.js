import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => updateCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin has been updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () => {
      toast.error("Cabin can't be updated");
    },
  });

  return { isEditing, editCabin };
}

export default useEditCabin;
