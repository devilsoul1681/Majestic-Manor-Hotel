import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useLoadBookings() {
  const [searchP] = useSearchParams();
  const queryClient = useQueryClient();

  //Filter
  const filterValue = searchP.get("status") || "all";
  const filterq = { label: "status", value: filterValue };

  //Sort
  const sortValue = (searchP.get("sortBy") || "startDate-asc").split("-");
  const sortField = sortValue[0];
  const sortOrder = sortValue[1];

  //Pagination

  const currentPage = !searchP.get("page") ? 1 : Number(searchP.get("page"));

  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filterValue, sortValue, currentPage],
    queryFn: () =>
      getAllBookings(currentPage, filterq, {
        field: sortField,
        order: sortOrder,
      }),
  });
  let bookings, count;
  if (data) {
    bookings = data.bookings;
    count = data.count;
  }
  queryClient.prefetchQuery({
    queryKey: ["bookings", filterValue, sortValue, currentPage - 1],
    queryFn: () =>
      getAllBookings(currentPage - 1, filterq, {
        field: sortField,
        order: sortOrder,
      }),
  });

  queryClient.prefetchQuery({
    queryKey: ["bookings", filterValue, sortValue, currentPage + 1],
    queryFn: () =>
      getAllBookings(currentPage + 1, filterq, {
        field: sortField,
        order: sortOrder,
      }),
  });
  return { isLoading, bookings, error, count };
}

export default useLoadBookings;
