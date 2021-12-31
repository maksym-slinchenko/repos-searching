export const isItemInArr = (arr, item, setMethod) => {
  if (arr.includes(item)) {
    setMethod(true);
  }
};

const arrayToggleItem = (arr, item, setMethod) => {
  if (arr.includes(item)) {
    setMethod(false);
    return arr.filter(i => i !== item);
  } else {
    setMethod(true);
    return [...arr, item];
  }
};

export const handleToggleIsFavorite = async (
  id,
  setMethod,
) => {
  const preFavoritesRepos = await JSON.parse(
    localStorage.getItem('favoritesRepos'),
  );
  if (preFavoritesRepos) {
    localStorage.removeItem('favoritesRepos');
    localStorage.setItem(
      'favoritesRepos',
      JSON.stringify(
        arrayToggleItem(preFavoritesRepos, id, setMethod),
      ),
    );
  } else {
    localStorage.setItem(
      'favoritesRepos',
      JSON.stringify([id]),
      setMethod(true),
    );
  }
};
