import { Link, useLocation } from "react-router-dom";
import Button from "../Button/Button";

import logo from "../../../assets/images/Rolling-logo.png";
import styled from "styled-components";

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale[200]};
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1207px;
  height: 64px;
  padding: 11px 24px;
`;

const Logo = styled.img`
  display: flex;
  width: 106px;
  cursor: pointer;
`;

function Navbar() {
  const location = useLocation();
  const isPostPage = location.pathname.startsWith("/post");

  return (
    <NavbarWrapper>
      <NavbarContainer>
        <Link to="/">
          <Logo src={logo} alt="Rolling Logo" />
        </Link>
        {!isPostPage && (
          <Link to="/post">
            <Button variant="outlined" size="40">
              롤링 페이퍼 만들기
            </Button>
          </Link>
        )}
      </NavbarContainer>
    </NavbarWrapper>
  );
}

export default Navbar;
