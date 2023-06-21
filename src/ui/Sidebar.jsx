import { css, styled } from 'styled-components';
import { useState } from 'react';
import Logo from './Logo';
import MainNav from './MainNav';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  /* Media query for tablet-sized devices or smaller */
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    height: 100vh;
    left: -600px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.26);
    z-index: 10;
    transition: 0.4s;
    width: 40%;
    ${(props) =>
      props.isOpen &&
      css`
        left: 0;
      `};
  }

  @media (max-width: 576px) {
    width: 60%;
  }

  @media (max-width: 425px) {
    width: 60%;
  }
`;

const BackShade = styled.div`
  position: fixed;
  top: 0px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 5;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
  ${(props) =>
    props.isOpen &&
    css`
      opacity: 1;
      pointer-events: unset;
    `}
`;

const SidebarToggleButton = styled.button`
  display: none;

  /* Media query for tablet-sized devices or smaller */
  @media (max-width: 768px) {
    width: 5%;
    height: 6%;
    display: block;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    position: absolute;
    left: 5%;
    top: 1%;
    z-index: 10;
    box-shadow: var(--shadow-welo);
    border-radius: var(--border-radius-md);
  }
`;

const FilledSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="#4f46e5"
    viewBox="0 0 256 256"
  >
    <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H88V56H216V200Z"></path>
  </svg>
);

const LightSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="#4f46e5"
    viewBox="0 0 256 256"
  >
    <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H80V200H40ZM216,200H96V56H216V200Z"></path>
  </svg>
);

function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {!isSidebarOpen && (
        <SidebarToggleButton onClick={toggleSidebar}>
          {isSidebarOpen ? <FilledSVG /> : <LightSVG />}
        </SidebarToggleButton>
      )}

      <BackShade onClick={toggleSidebar} isOpen={isSidebarOpen} />
      <StyledSidebar isOpen={isSidebarOpen}>
        <Logo />
        <MainNav />
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
