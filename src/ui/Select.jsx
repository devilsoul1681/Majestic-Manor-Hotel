import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick(value) {
    if (searchParams.get("page")) {
      searchParams.set("page", 1);
    }
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }
  const defaultValue = searchParams.get("sortBy") || "name-asc";
  return (
    <StyledSelect
      defaultValue={defaultValue}
      onChange={(e) => handleClick(e.target.value)}
    >
      {options.map((opt) => (
        <option value={opt.value} key={opt.value}>
          {opt.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
