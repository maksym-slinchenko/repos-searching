import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import icon from '../images/cross-black-and-white.svg';

export default function ErrorPage({ handleError }) {
  return (
    <Wrapper>
      <StyledNavLink
        to="/"
        onClick={() => handleError(null)}
      >
        <span>Home</span>
      </StyledNavLink>
      <IconContainer>
        <Icon src={icon} />
        <ErrorMassage>
          <span>
            Something went wrong.
            <br />
            Return Home after a few seconds
          </span>
        </ErrorMassage>
      </IconContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: ${props => props.theme.mobile};
  margin: 15px auto;
  @media screen and (min-width: ${props =>
      props.theme.desktop}) {
    max-width: unset;
    width: ${props => props.theme.desktop};
    margin: 20px auto;
    padding: 0 100px;
  }
`;
const StyledNavLink = styled(NavLink)`
  display: block;
  width: fit-content;
  padding: 5px 10px;
  border: solid 2px black;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  background-color: ${props => props.theme.buttonColor};
  color: black;
`;
const IconContainer = styled.div`
  display: flex;
  column-gap: 30px;
`;
const Icon = styled.img``;
const ErrorMassage = styled.h2`
  font-size: 1em;
  @media screen and (min-width: ${props =>
      props.theme.desktop}) {
    font-size: 1.5em;
  }
`;
