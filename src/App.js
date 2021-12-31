import { lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import './App.css';

const MainPage = lazy(() =>
  import(
    './pages/MainPage' /* webpackChunkName: "main-page" */
  ),
);
const ViewMore = lazy(() =>
  import(
    './pages/ViewMore' /* webpackChunkName: "view-more" */
  ),
);

const theme = {
  mobile: '320px',
  desktop: '1280px',
  container: '700px',
  cardStyle:
    'background-color: #f5f1f1; box-shadow: 3px 3px 5px 4px rgba(0, 0, 255, 0.2); border-radius: 5px;',
  favoriteColor: 'orange',
  buttonColor: '#d7f9f6',
  hoverFocus:
    'box-shadow: 0px 0px 3px 3px rgba(0, 0, 255, 0.2);',
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense
        fallback={
          <StyledLoader
            type="Bars"
            color="#00BFFF"
            height={80}
            width={80}
          />
        }
      >
        <Switch>
          <Route path="/repos/:id" component={ViewMore} />
          <Route exact path="/" component={MainPage} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </ThemeProvider>
  );
}

const StyledLoader = styled(Loader)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default App;
