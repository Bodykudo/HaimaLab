import styled from 'styled-components';

import { useMoveBack } from '../hooks/useMoveBack';
import Button from '../ui/Button';

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Container = styled.div`
  background-color: var(--color-grey-0);
  border-radius: 8px;
  padding: 40px;
  box-shadow: var(--shadow-md);
`;

const Title = styled.h1`
  color: var(--color-brand-600);
  font-size: 48px;
  margin: 0 0 20px;
`;

const Text = styled.p`
  /* color: #333333; */
  font-size: 18px;
  margin: 0 0 20px;
`;

const Photo = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 5px;
`;

function PageNotFound() {
  const moveBack = useMoveBack();
  document.title = 'HaimaLab';

  return (
    <StyledPageNotFound>
      <Container>
        <Photo src="error.png" alt="Medical Icon" />
        <Title>404 Error</Title>
        <Text>Oops! The page you&apos;re looking for doesn&apos;t exist.</Text>
        <Button onClick={moveBack} size="large">
          &larr; Go back
        </Button>
      </Container>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
