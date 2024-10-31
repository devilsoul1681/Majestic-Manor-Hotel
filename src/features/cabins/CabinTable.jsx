import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useLoadCabin from "./useLoadCabin";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";
const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const [searchP] = useSearchParams();
  const { isLoading, cabins } = useLoadCabin();
  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName={"cabins"} />;
  const sortField = (searchP.get("sortBy") || "name-asc").split("-");
  const sortLabel = sortField[0];
  const sortValue = sortField[1];
  const modifier = sortValue === "asc" ? 1 : -1;
  let filterCabin;
  if (searchP.get("discount") === null || searchP.get("discount") === "all") {
    filterCabin = cabins;
  }
  if (searchP.get("discount") === "Discount")
    filterCabin = cabins.filter((cabin) => Number(cabin.discount) > 0);

  if (searchP.get("discount") === "NDiscount")
    filterCabin = cabins.filter((cabin) => Number(cabin.discount) === 0);

  filterCabin = filterCabin.sort(
    (a, b) => (a[sortLabel] - b[sortLabel]) * modifier
  );
  return (
    <Menus>
      <Table role="table">
        <TableHeader role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </TableHeader>
        {filterCabin.map((cabin) => (
          <CabinRow cabin={cabin} key={cabin.id}></CabinRow>
        ))}
      </Table>
    </Menus>
  );
}
export default CabinTable;
