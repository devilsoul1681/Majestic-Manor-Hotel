import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isLoginUser, mutate: login } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Successfull log-in");
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Wrong email and password");
    },
  });
  return { isLoginUser, login };
}

export default useLogin;
