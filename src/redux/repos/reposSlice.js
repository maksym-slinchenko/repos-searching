import { createSlice } from '@reduxjs/toolkit';

export const reposSlice = createSlice({
  name: 'repos',
  initialState: {
    searchedRepos: [],
  },
  reducers: {
    searchRepos: (state, action) => {
      state.searchedRepos = action.payload;
    },
  },
});

export const { searchRepos } = reposSlice.actions;

export default reposSlice.reducer;
