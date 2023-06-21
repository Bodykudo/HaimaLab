/* eslint-disable react/prop-types */
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledDataRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

function DataRow({ icon, color, label, value }) {
  return (
    <StyledDataRow>
      <span>
        <FontAwesomeIcon icon={icon} style={{ color: color }} />
      </span>
      {''}
      {label ? (
        <span>
          {label}: {value}
        </span>
      ) : (
        <span>{value}</span>
      )}
    </StyledDataRow>
  );
}

export default DataRow;
