import React from 'react';
import styled from 'styled-components';
import Button from './Button';

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  changePage,
}) {
  const countTotalPages = () => {
    if ((totalItems / itemsPerPage) % 1 === 0) {
      return totalItems / itemsPerPage;
    }
    return Math.trunc(totalItems / itemsPerPage) + 1;
  };

  return (
    <Wrapper>
      <Button
        title="Prev"
        type="button"
        handleClick={() => {
          changePage(-1);
          window.scrollTo(0, 0);
        }}
        disabled={currentPage <= 1}
      />
      <CurrentPage>{`${
        totalItems > 0 ? currentPage : 0
      } / ${countTotalPages()}`}</CurrentPage>
      <Button
        title="Next"
        type="button"
        handleClick={() => {
          changePage(+1);
          window.scrollTo(0, 0);
        }}
        disabled={
          totalItems / itemsPerPage <= currentPage ||
          totalItems < itemsPerPage
        }
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  column-gap: 20px;
`;
const CurrentPage = styled.span``;
