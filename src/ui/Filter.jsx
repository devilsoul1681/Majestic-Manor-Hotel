import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ options, filterField }) {
  const [searchP, setSearchP] = useSearchParams();
  function handleClick(x) {
    searchP.set(filterField, x);
    if (searchP.get("page")) {
      searchP.set("page", 1);
    }
    setSearchP(searchP);
  }

  const filterValue = searchP.get(filterField) || options[0].value;

  return (
    <StyledFilter>
      {options.map((opt) => (
        <FilterButton
          key={opt.value}
          onClick={() => handleClick(opt.value)}
          active={filterValue === opt.value}
          disabled={filterValue === opt.value}
        >
          {opt.label}
        </FilterButton>
      ))}
      {/* <FilterButton
        onClick={() => handleClick("all")}
        active={filterValue === "all"}
        disabled={filterValue === "all"}
      >
        All
      </FilterButton>
      <FilterButton
        onClick={() => handleClick("Discount")}
        active={filterValue === "Discount"}
        disabled={filterValue === "Discount"}
      >
        With discount
      </FilterButton>
      <FilterButton
        onClick={() => handleClick("NDiscount")}
        active={filterValue === "NDiscount"}
        disabled={filterValue === "NDiscount"}
      >
        No discount
      </FilterButton> */}
    </StyledFilter>
  );
}

export default Filter;
