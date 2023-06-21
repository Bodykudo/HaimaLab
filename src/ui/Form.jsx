import styled, { css } from 'styled-components';

const Form = styled.form`
  ${(props) =>
    props.type === 'regular' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.login === 'true' &&
    css`
      @media (max-width: 576px) {
        width: 90%;
      }

      @media (max-width: 425px) {
        width: 100%;
        padding: 2.4rem;
      }
    `}

  ${(props) =>
    props.type === 'modal' &&
    css`
      width: 80rem;

      @media (max-width: 1045px) {
        width: 80vw;
        overflow-y: auto;
      }

      @media (max-width: 768px) {
        width: 75vw;
        height: 85vh;
      }
    `}
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: 'regular',
};

export default Form;
