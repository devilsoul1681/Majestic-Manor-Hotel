import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isLogingOut, mutate: logout } = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      toast.success("User successfully log-out");
      queryClient.removeQueries();
      navigate("/login");
    },
    onError: () => {
      toast.error("logout invalid");
    },
  });
  return { isLogingOut, logout };
}

export default useLogout;
