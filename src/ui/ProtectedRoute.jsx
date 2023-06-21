import { styled } from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* eslint-disable react/prop-types */
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // Load authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // If there is NO authenticated user, redirect to login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login');
    },
    [isAuthenticated, isLoading, navigate]
  );

  // While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
