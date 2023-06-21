import styled from 'styled-components';

const TableOperations = styled.div`
  display: flex;

  align-items: center;
  gap: 2rem;

  /* Mobile devices */
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export default TableOperations;
