import React from 'react';
import styled from 'styled-components';

export const ButtonThemes = {
  primary: 'filled',
  secondary: 'outlined',
  other: 'contrased',
};

export default function Button({
  disabled = false,
  title,
  type,
  handleClick,
  isColored,
}) {
  return (
    <Wraper
      disabled={disabled}
      type={type}
      isColored={isColored}
      onClick={handleClick}
    >
      <span>{title}</span>
    </Wraper>
  );
}
const Wraper = styled.button`
  width: fit-content;
  border-radius: 5px;
  background-color: ${props =>
    props.isColored
      ? props => props.theme.favoriteColor
      : props => props.theme.buttonColor};
  &:focus,
  :hover {
    ${props => props.theme.hoverFocus}
  }
`;
