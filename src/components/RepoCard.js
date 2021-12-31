import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  handleToggleIsFavorite,
  isItemInArr,
} from '../service/local-storage-opers';
import Button from './Button';

export default function RepoCard({
  id,
  name,
  picture,
  login,
  rating,
  date,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const preFavoritesRepos = JSON.parse(
      localStorage.getItem('favoritesRepos'),
    );
    isItemInArr(preFavoritesRepos, id, setIsFavorite);
  }, []);

  return (
    <CardContainer>
      <CardInfo>
        <CardName>
          <span>{name}</span>
        </CardName>
        <CardRating>
          <BoldText>Rating: </BoldText>
          <span>{rating}</span>
        </CardRating>
        <Date>
          <BoldText>Date: </BoldText>
          <span>
            {date.split('T').join(' | ').slice(0, -1)}
          </span>
        </Date>
        <OwnerContainer>
          <Avatar src={picture} alt="avatar" />
          <Owner>
            <BoldText>Owner: </BoldText>
            <span>{login}</span>
          </Owner>
        </OwnerContainer>
      </CardInfo>
      <ButtonsContainer>
        <NavLink
          to={{
            pathname: `/repos/${id}`,
            state: { from: location },
          }}
        >
          <span>View more</span>
        </NavLink>
        <Button
          title="Favourite"
          type="button"
          isColored={isFavorite}
          handleClick={() => {
            handleToggleIsFavorite(id, setIsFavorite);
          }}
        />
      </ButtonsContainer>
    </CardContainer>
  );
}

const CardContainer = styled.li`
  list-style-type: none;
  padding: 15px;
  margin: 10px 0;
  ${props => props.theme.cardStyle}
  @media screen and (min-width: ${props =>
    props.theme.desktop}) {
    display: flex;
    flex-direction: column;
    margin: 10px;
    width: calc((100% - (8 * 10px)) / 4);
    justify-content: space-between;
  }
`;
const CardInfo = styled.div``;
const CardName = styled.h3`
  margin-top: 0;
`;
const Avatar = styled.img`
  height: 50px;
`;
const CardRating = styled.p``;
const Owner = styled.p`
  word-wrap: break-word;
`;
const Date = styled.p`
  margin-top: 5px;
`;
const OwnerContainer = styled.div`
  display: flex;
  column-gap: 20px;
  margin-top: 10px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const BoldText = styled.span`
  font-weight: bold;
`;
