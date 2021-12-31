import React from 'react';
import styled from 'styled-components';
import icon from '../images/arrow-down.svg';

export default function Sorting({
  title,
  handleClick,
  hasCollection,
  order,
  isSortingActive,
}) {
  return (
    <Wrapper
      onClick={handleClick}
      disabled={!hasCollection}
    >
      <span>{title}</span>
      <Icon
        src={icon}
        arrowState={order}
        isSortingActive={isSortingActive}
      />
    </Wrapper>
  );
}

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding: 0 5px;
  width: fit-content;
  border-radius: 5px;
  background-color: ${props => props.theme.buttonColor};
  &:focus,
  :hover {
    ${props => props.theme.hoverFocus}
  }
  @media screen and (min-width: ${props =>
      props.theme.desktop}) {
    column-gap: 20px;
    padding: 0 10px;
  }
`;
const Icon = styled.img`
  height: 60%;
  display: block;
  transform: ${props =>
    props.arrowState === 'desc'
      ? 'rotate(180deg)'
      : 'unset'};
  ${props =>
    props.isSortingActive
      ? 'opacity: 1; visibility: unset'
      : 'opacity: 0; visibility: hidden'}
`;
