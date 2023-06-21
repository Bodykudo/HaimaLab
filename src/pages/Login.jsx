import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';
import { useNavigate } from 'react-router-dom';
import { useUser, useUserById } from '../features/authentication/useUser';
import Spinner from '../ui/Spinner';
import { useState } from 'react';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

function Login() {
  const { user: userAuth, isLoading } = useUser();
  const { user } = useUserById(userAuth?.user_metadata?.userId || 0);
  const [showSpinner, setShowSpinner] = useState(true);

  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  document.title = 'HaimaLab - Login';

  const userRole = user?.userRole ? user.userRole : '';

  const navigateTo =
    userRole === 'admin'
      ? 'dashboard'
      : userRole !== 'patient'
      ? 'patients'
      : `patient/${user?.id || 0}`;

  if (userRole !== '') navigate(`/${navigateTo}`);

  setTimeout(() => setShowSpinner(false), 1000);

  return (
    <>
      {showSpinner ? (
        <Spinner />
      ) : (
        <LoginLayout>
          <Logo />
          <Heading as="h4">Log in to your account</Heading>
          <LoginForm />
        </LoginLayout>
      )}
    </>
  );
}

export default Login;
