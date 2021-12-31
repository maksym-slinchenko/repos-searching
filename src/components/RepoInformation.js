import React from 'react';
import styled from 'styled-components';

export default function RepoInformation({
  avatar,
  login,
  repoName,
  date,
  link,
  description,
}) {
  return (
    <Wrapper>
      <Avatar src={avatar} alt="avatar" />
      <DescriptionContainer>
        <GitHubRepo>
          <BoldText>Repository: </BoldText>
          <GitHubLink href={link} target="_blank">
            <span>{repoName}</span>
          </GitHubLink>
        </GitHubRepo>
        <Owner>
          <BoldText>Owner: </BoldText>
          <span>{login}</span>
        </Owner>
        <Date>
          <BoldText>Date of creation: </BoldText>
          <span>{date}</span>
        </Date>
        <Description>
          <BoldText>Description: </BoldText>
          <span>{description}</span>
        </Description>
      </DescriptionContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  margin: 0 auto;
  ${props => props.theme.cardStyle};
  @media screen and (min-width: ${props =>
      props.theme.desktop}) {
    display: flex;
    column-gap: 20px;
  }
`;
const Avatar = styled.img`
  width: 100%;
  height: fit-content;
  @media screen and (min-width: ${props =>
      props.theme.desktop}) {
    width: 150px;
  }
`;
const DescriptionContainer = styled.div`
  & > :not(:first-child) {
    margin-top: 10px;
  }
  word-wrap: break-word;
  @media screen and (min-width: ${props =>
      props.theme.desktop}) {
    max-width: 75%;
  }
`;
const Owner = styled.p``;
const GitHubRepo = styled.p``;
const Description = styled.p``;
const Date = styled.p``;
const GitHubLink = styled.a``;
const BoldText = styled.span`
  font-weight: bold;
`;
