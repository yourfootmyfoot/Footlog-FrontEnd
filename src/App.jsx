import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import GlobalStyles from './theme/GlobalStyles';
import theme from './theme/theme';
import Landing from './pages/Landing';
import Login from './pages/Login/Login';
import Footer from './components/Layout/Footer';
import Match from './pages/Match/Match';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/match" component={Match} />
          {/*<Route path="/club" component={Club} />
          <Route path="/profile" component={Profile} />
          <Route path="/guest" component={Guest} />
          <Route path="/settings" component={Settings} />*/}
        </Switch>
      <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
