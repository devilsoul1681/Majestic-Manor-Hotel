import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useGetSettings() {
  const { isLoading, data: userSettings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isLoading, userSettings };
}

export default useGetSettings;
