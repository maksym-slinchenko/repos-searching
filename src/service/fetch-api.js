export const mainUrl = 'https://api.github.com/';

const getSearchedRepos = async (
  search,
  pageNumber,
  perPage,
  sort,
  order,
) => {
  return await fetch(
    `${mainUrl}search/repositories?q=name:${search}&page=${pageNumber}&per_page=${perPage}&sort=${sort}&order=${order}`,
  ).then(res => res.json());
};

const getRepoById = async id => {
  return await fetch(
    `${mainUrl}repositories/${id}`,
  ).then(res => res.json());
};

const api = { getSearchedRepos, getRepoById };
export default api;
