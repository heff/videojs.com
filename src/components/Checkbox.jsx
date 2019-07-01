import React from 'react';
import styled, { css } from 'styled-components';

import TickIcon from './TickIcon';

const Wrapper = styled.div`
  position: relative;  
`;

const Input = styled.input`
  border: 0;
  height: 1px;
  margin: 0;
  position: absolute;
  width: 1px;
  z-index: -1;
`;

const Box = styled.span`
  background-color: #ebebeb;
  border-radius: 0.375em;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  height: 1.25em;
  width: 1.25em;
  vertical-align: middle;

  ${props => props.checked && css`
    background-color: #4677ba;
    color: #fff;
  `}
`;

const StyledTickIcon = styled(TickIcon)`
  position: absolute;
  top: -0.2em;
  left: -0.375em;
`;

const Label = styled.label`
  color: #000;
  display: inline-block;
  font-size: 10px;
  font-weight: bold;
  margin-left: 1em;
  vertical-align: middle;
  user-select: none;
`;

const Checkbox = ({ label, checked, onCheck }) => (
  <Wrapper>
    <Input />
    <Box checked={checked} onClick={onCheck}>
      {checked && <StyledTickIcon />}
    </Box>
    <Label>{label}</Label>
  </Wrapper>
);

export default Checkbox;
