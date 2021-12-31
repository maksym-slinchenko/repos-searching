import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import RepoCard from '../components/RepoCard';
import Searching from '../components/Searching';
import SortingButton from '../components/SortingButton';
import { searchRepos } from '../redux/repos/reposSlice';
import api from '../service/fetch-api';
import ErrorPage from './ErrorPage';
import Starting from './Starting';
import ViewMore from './ViewMore';

const sortingButtonKit = [
  {
    title: 'Ration',
    sortingCondition: 'stars',
  },
  {
    title: 'Name',
    sortingCondition: 'name',
  },
  {
    title: 'Date',
    sortingCondition: 'updated',
  },
];

export default function MainPage() {
  const [fixedSearchValue, setFixedSearchValue] = useState(
    '',
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRepos, setTotalRepos] = useState(null);
  const [repoForViewMore, setRepoForViewMore] = useState(
    null,
  );
  const [greeting, setGreeting] = useState(true);
  const [
    sortingConditions,
    setSortingConditions,
  ] = useState('stars');
  const [order, setOrder] = useState('asc');
  const [error, setError] = useState(null);

  const location = useLocation();
  const history = useHistory();
  const reposPerPage = 12;

  const searchedResault = useSelector(
    state => state.repos.searchedRepos,
  );

  const dispatch = useDispatch();

  const dispatchRepos = (
    value,
    currentPage,
    reposPerPage,
    sortingConditions,
    order,
  ) => {
    api
      .getSearchedRepos(
        value,
        currentPage,
        reposPerPage,
        sortingConditions,
        order,
      )
      .then(result => {
        if (result.message) {
          setError(result.message);
          return;
        }
        setTotalRepos(result.total_count);
        dispatch(searchRepos(result.items));
      })
      .catch(err => setError(err));
  };

  const addQueryToUrl = (
    value,
    currentPage,
    sortingConditions,
    order,
  ) =>
    history.push({
      ...location,
      search: `query=${
        value ? value : fixedSearchValue
      }&page=${currentPage}&sort=${sortingConditions}&order=${order}`,
    });

  const handleChangePage = expression => {
    setCurrentPage(currentPage + expression);
  };

  const handleSearch = value => {
    setFixedSearchValue(value);
    setCurrentPage(1);
    setSortingConditions('stars');
    setOrder('asc');
  };

  const handleToggleOrder = (
    currentSortingCondition,
    prevSortingCondition,
    setOrder,
  ) => {
    currentSortingCondition !== prevSortingCondition
      ? setOrder('asc')
      : order === 'desc'
      ? setOrder('asc')
      : setOrder('desc');
  };

  const handleSort = condition => {
    setSortingConditions(condition);
    handleToggleOrder(
      condition,
      sortingConditions,
      setOrder,
    );
    setCurrentPage(1);
  };

  if (
    JSON.parse(sessionStorage.getItem('isGreetingWasShown'))
  ) {
    if (greeting) {
      setGreeting(false);
    }
  } else {
    setTimeout(() => setGreeting(false), 2000);
  }

  useEffect(() => {
    if (currentPage > 0) {
      addQueryToUrl(
        fixedSearchValue,
        currentPage,
        sortingConditions,
        order,
      );
    }
  }, [
    fixedSearchValue,
    currentPage,
    sortingConditions,
    order,
  ]);

  useEffect(() => {
    if (fixedSearchValue) {
      dispatchRepos(
        fixedSearchValue,
        currentPage,
        reposPerPage,
        sortingConditions,
        order,
      );
    }
  }, [
    fixedSearchValue,
    currentPage,
    reposPerPage,
    sortingConditions,
    order,
  ]);

  useEffect(() => {
    if (!location.search) {
      return;
    }
    const { query, page, sort, order } = queryString.parse(
      location.search,
    );
    if (query) {
      dispatchRepos(query, page, reposPerPage, sort, order);
      setCurrentPage(Number(page));
      setFixedSearchValue(query);
      setSortingConditions(sort);
      setOrder(order);
    }
  }, []);

  return (
    <Wrapper>
      {error ? (
        <ErrorPage handleError={setError} />
      ) : (
        <>
          <MainCotentCotainer>
            {greeting ? (
              <Starting authorName="Maksym Slinchenko" />
            ) : (
              <>
                <Searching handleSearch={handleSearch} />
                {searchedResault.length > 1 && (
                  <SortContainer>
                    {sortingButtonKit.map(
                      (button, index) => (
                        <SortingButton
                          key={index}
                          title={button.title}
                          handleClick={() => {
                            handleSort(
                              button.sortingCondition,
                            );
                          }}
                          hasCollection={
                            searchedResault.length > 1
                          }
                          isSortingActive={
                            sortingConditions ===
                            button.sortingCondition
                          }
                          order={order}
                        />
                      ),
                    )}
                  </SortContainer>
                )}
                <RepoList>
                  {totalRepos !== 0
                    ? searchedResault.map(i => (
                        <RepoCard
                          key={i.id}
                          id={i.id}
                          name={i.name}
                          picture={i.owner.avatar_url}
                          login={i.owner.login}
                          rating={i.stargazers_count}
                          date={i.created_at}
                          viewMoreRepo={() =>
                            setRepoForViewMore(i)
                          }
                        />
                      ))
                    : fixedSearchValue && (
                        <EmptyListMessage>
                          <span>
                            Repositories by this name
                            weren't found
                          </span>
                        </EmptyListMessage>
                      )}
                </RepoList>
                <Pagination
                  currentPage={currentPage}
                  totalItems={totalRepos}
                  itemsPerPage={reposPerPage}
                  changePage={handleChangePage}
                />
                {repoForViewMore && (
                  <ViewMore repo={repoForViewMore} />
                )}
              </>
            )}
          </MainCotentCotainer>
        </>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  max-width: ${props => props.theme.mobile};
  margin: 0 auto;
  @media screen and (min-width: ${props =>
      props.theme.desktop}) {
    width: ${props => props.theme.desktop};
    max-width: unset;
  }
`;
const MainCotentCotainer = styled.div`
  padding: 20px;
`;
const RepoList = styled.ul`
  @media screen and (min-width: ${props =>
      props.theme.desktop}) {
    display: flex;
    flex-wrap: wrap;
    margin: 15px -10px 0 -10px;
    max-height: 77vh;
    overflow-y: auto;
  }
`;
const EmptyListMessage = styled.h2`
  text-align: center;
`;
const SortContainer = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 15px;
  column-gap: 15px;
`;
