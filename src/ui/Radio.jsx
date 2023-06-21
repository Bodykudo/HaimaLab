/* eslint-disable react/prop-types */
import styled from 'styled-components';

const StyledRadio = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type='radio'] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & input[type='radio']:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

function Radio({ checked, id, children, value, name, func }) {
  return (
    <StyledRadio>
      <input
        type="radio"
        id={id}
        checked={checked}
        value={value}
        name={name}
        {...func}
      />
      <label htmlFor={id}>{children}</label>
    </StyledRadio>
  );
}

export default Radio;
