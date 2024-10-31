import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
const FullSpinner = styled.div`
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function Logout() {
  const { isLogingOut, logout } = useLogout();
  if (isLogingOut)
    return (
      <FullSpinner>
        <Spinner />
      </FullSpinner>
    );
  return (
    <ButtonIcon onClick={logout} disabled={isLogingOut}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
