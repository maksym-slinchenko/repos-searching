import React, { useEffect, useState } from 'react';
import {
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import Repoinformation from '../components/RepoInformation';
import { mainUrl } from '../service/fetch-api';

export default function ViewMore() {
  const [repo, setRepo] = useState(null);

  const repoId = useParams().id;
  const history = useHistory();
  const location = useLocation();

  const getRepoById = (url, id) => {
    fetch(`${url}repositories/${id}`)
      .then(res => res.json())
      .then(repo => {
        setRepo(repo);
      })
      .catch(err => alert(err.message));
  };

  useEffect(() => getRepoById(mainUrl, repoId), []);

  const handleGoBack = (history, location) => {
    history.push(location.state.from);
  };

  return (
    <Wrapper>
      <Button
        disabled={!location.state}
        title="Go back"
        type="button"
        handleClick={() => {
          handleGoBack(history, location);
        }}
      />
      {repo && (
        <Repoinformation
          avatar={repo.owner.avatar_url}
          login={repo.owner.login}
          repoName={repo.name}
          date={repo.created_at
            .split('T')
            .join(' | ')
            .slice(0, -1)}
          link={repo.html_url}
          description={repo.description}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: ${props => props.theme.mobile};
  @media screen and (min-width: ${props =>
      props.theme.desktop}) {
    width: ${props => props.theme.desktop};
    max-width: unset;
  }
  margin: 0 auto;
  padding: 20px;
  & button {
    margin-bottom: 15px;
  }
`;
