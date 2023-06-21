import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { styled } from 'styled-components';
import { useState } from 'react';
import ChatGPT from '../features/chatbot/ChatGPT';
import { FaRobot } from 'react-icons/fa';
import { useUserRole } from '../hooks/useUserRole';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: 576px) {
    padding: 4rem 2rem 6.4rem;
  }

  @media (max-width: 425px) {
    padding: 4rem 1rem 6.4rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const userRole = useUserRole();

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <StyledAppLayout columns={userRole === 'patient' ? '1fr' : '26rem 1fr'}>
      <Header />
      {userRole !== 'patient' && <Sidebar />}
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>

      {userRole !== 'admin' && userRole !== 'super' && isChatOpen && (
        <ChatGPT onClose={handleCloseChat} />
      )}
      {userRole !== 'admin' && userRole !== 'super' && !isChatOpen && (
        <div className="chat-button-container">
          <button className="chat-button" onClick={handleOpenChat}>
            <FaRobot />
          </button>
        </div>
      )}
    </StyledAppLayout>
  );
}

export default AppLayout;
