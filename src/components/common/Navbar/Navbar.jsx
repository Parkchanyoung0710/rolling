import { Link, useLocation } from "react-router-dom";
import Button from "../Button/Button";
import { LogoImg } from "../../../assets/images/icon/IconIndex";
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

const StyledLogo = styled(LogoImg)`
  width: 106px;
  cursor: pointer;


  @media (min-width: 1200px) {
    display: flex;
  }

  
  @media (max-width: 767px) {
    display: ${({ showLogo }) => (showLogo ? 'flex' : 'none')};
  }
`;

function Navbar() {
  const location = useLocation();

  const showLogo = location.pathname === '/list' || location.pathname === '/';

  const isPostPage = location.pathname.startsWith("/post");

  return (
    <NavbarWrapper>
      <NavbarContainer>
        <Link to="/">
          <StyledLogo alt="Rolling Logo" showLogo={showLogo} />
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