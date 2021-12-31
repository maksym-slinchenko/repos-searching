import { configureStore } from '@reduxjs/toolkit';
import reposReducer from './repos/reposSlice';

export default configureStore({
  reducer: { repos: reposReducer },
});
