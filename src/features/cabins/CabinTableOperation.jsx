import TableOperation from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortTable from "../../ui/SortTable";
function CabinTableOperation() {
  return (
    <TableOperation>
      <Filter
        filterField={"discount"}
        options={[
          { value: "all", label: "All" },
          { value: "Discount", label: "With discount" },
          { value: "NDiscount", label: "No discount" },
        ]}
      ></Filter>
      <SortTable
        options={[
          { value: "name-asc", label: "Sort by name(A-Z)" },
          { value: "name-desc", label: "Sort by name(Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price(low to high)" },
          { value: "regularPrice-desc", label: "Sort by Price(high to low" },
          { value: "discount-asc", label: "Sort by discount(low to high)" },
          { value: "discount-desc", label: "Sort by discount(high to low) " },
          {
            value: "maxCapacity-asc",
            label: "Sort by maxcapacity(low to high)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by maxcapacity(high to low)",
          },
        ]}
      />
    </TableOperation>
  );
}

export default CabinTableOperation;
