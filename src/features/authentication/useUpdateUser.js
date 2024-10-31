import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateUser } from "../../services/apiAuth";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: editUser } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User has been updated");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => {
      toast.error("User can't be updated");
    },
  });

  return { isUpdating, editUser };
}

export default useUpdateUser;
