import React, { useEffect } from 'react';
import styled from 'styled-components';

export default function Starting({ authorName }) {
  useEffect(() => {
    return () => {
      sessionStorage.setItem(
        'isGreetingWasShown',
        JSON.stringify(true),
      );
    };
  }, []);

  return (
    <Wraper>
      <GreetingName>
        <span>{authorName}</span>
      </GreetingName>
      <GreetingFrase>
        <span>
          Test work for a React.js developer position
        </span>
      </GreetingFrase>
    </Wraper>
  );
}

const Wraper = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: ${props => props.theme.mobile};
  @media screen and (min-width: ${props =>
      props.theme.desktop}) {
    max-width: unset;
    width: ${props => props.theme.desktop};
  }
`;
const GreetingName = styled.h1`
  font-size: 3em;
`;
const GreetingFrase = styled.h2`
  font-size: 1.8em;
  margin: 0;
`;
