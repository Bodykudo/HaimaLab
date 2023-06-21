import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouseMedical,
  faStethoscope,
  faHospitalUser,
  faUserDoctor,
  faUserNurse,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { useUserRole } from '../hooks/useUserRole';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  const userRole = useUserRole();

  return (
    <nav>
      <NavList>
        {userRole === 'admin' ? (
          <li>
            <StyledNavLink to="/dashboard">
              <FontAwesomeIcon icon={faHouseMedical} />
              <span>Home</span>
            </StyledNavLink>
          </li>
        ) : null}

        {userRole === 'admin' ? (
          <li>
            <StyledNavLink to="/devices">
              <FontAwesomeIcon icon={faStethoscope} />
              <span>Devices</span>
            </StyledNavLink>
          </li>
        ) : null}

        {userRole === 'admin' ? (
          <li>
            <StyledNavLink to="/admins">
              <FontAwesomeIcon icon={faHospitalUser} />
              <span>Admins</span>
            </StyledNavLink>
          </li>
        ) : null}

        {userRole !== 'patient' ? (
          <li>
            <StyledNavLink to="/doctors">
              <FontAwesomeIcon icon={faUserDoctor} />
              <span>Doctors</span>
            </StyledNavLink>
          </li>
        ) : null}

        {userRole !== 'patient' ? (
          <li>
            <StyledNavLink to="/nurses">
              <FontAwesomeIcon icon={faUserNurse} />
              <span>Nurses</span>
            </StyledNavLink>
          </li>
        ) : null}

        {userRole !== 'patient' ? (
          <li>
            <StyledNavLink to="/patients">
              <FontAwesomeIcon icon={faUser} />
              <span>Patients</span>
            </StyledNavLink>
          </li>
        ) : null}

        {/* <li>
          <StyledNavLink to="/settings">
            <FaHospital />
            <span>Settings</span>
          </StyledNavLink>
        </li> */}
      </NavList>
    </nav>
  );
}

export default MainNav;
