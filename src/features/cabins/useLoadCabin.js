import { useQuery } from "@tanstack/react-query";
import { getCabin } from "../../services/apiCabin";

function useLoadCabin() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabin,
  });
  return { isLoading, cabins, error };
}

export default useLoadCabin;
