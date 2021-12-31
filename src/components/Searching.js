import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

export default function Searching({ handleSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  const searchSubmit = e => {
    e.preventDefault();
    if (!searchValue) {
      alert(`Search mustn't be empty`);
      return;
    }
    handleSearch(searchValue);
    setSearchValue('');
  };

  return (
    <Wraper>
      <SearchForm onSubmit={searchSubmit}>
        <Label htmlFor="search">
          <span>Repositories searching</span>
        </Label>
        <Input
          type="text"
          id="search"
          value={searchValue}
          onChange={handleChange}
        />
        <Button title="Search" type="submit" />
      </SearchForm>
    </Wraper>
  );
}

const Wraper = styled.div``;
const SearchForm = styled.form``;
const Input = styled.input`
  width: 75%;
  margin-right: 10px;
  @media screen and (min-width: ${props =>
      props.theme.desktop}) {
    width: unset;
    margin: 0 10px;
  }
`;
const Label = styled.label`
  font-weight: bold;
`;
