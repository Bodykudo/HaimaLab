import { styled } from 'styled-components';
import Logout from '../features/authentication/Logout';
import ButtonIcon from './ButtonIcon';
import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { useUser, useUserById } from '../features/authentication/useUser';
import SpinnerMini from './SpinnerMini';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { user: userAuth } = useUser();
  const { isLoading, user } = useUserById(userAuth.user_metadata.userId);

  if (isLoading) {
    return <SpinnerMini />;
  }

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate(`/${user.userRole}/${user.id}`)}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
