import React from 'react';
import styled from 'styled-components';
import Input from '../Input';

const InputSection = styled.div`
  margin: 0;
  padding: 25px 30px 0;
`;

export default props => (
  <InputSection>
    <Input {...props} />
  </InputSection>
);
