import { StyledHeader } from "./styled";
import Logo from "@/assets/images/Logo.png";

const NavBar = () => {
  return (
    <StyledHeader>
      <img src={Logo} alt="Logo" />
    </StyledHeader>
  );
};

export default NavBar;
