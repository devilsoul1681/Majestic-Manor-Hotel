import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
  const { isLoading, mutate: signUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      toast.success(
        "Account successfully created! Please verify new account email address"
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isLoading, signUp };
}

export default useSignup;
