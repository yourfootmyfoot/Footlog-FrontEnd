import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import GlobalStyles from './theme/GlobalStyles';
import theme from './theme/theme';
import Landing from './pages/Landing';
import Login from './pages/Login/Login';
import Header from './components/layout/Header';
import Footer from './components/Layout/Footer';
import Match from './pages/Match/Match';
import MatchDetail from './pages/match/MatchDetail';
import AppContainer from './components/layout/AppContainer/AppContainer';
import Mercenary from './pages/Mercenary/pages/MercenaryChoice';
import MercenaryAppList from './pages/Mercenary/pages/MercenaryApp/MercenaryAppList';
import MercenaryRecList from './pages/Mercenary/pages/MercenaryRec/MercenaryRecList';
import ClubList from './pages/ClubList/pages/ClubList';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppContainer>
        <Header />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/match" component={Match} />
            <Route path="/matchDetail" component={MatchDetail} />
            <Route path="/Mercenary" component={Mercenary} />
            <Route path="/MercenaryAppList" component={MercenaryAppList} />
            <Route path="/MercenaryRecList" component={MercenaryRecList} />
            <Route path="/ClubList" component={ClubList} />
            {/*<Route path="/club" component={Club} />
            <Route path="/profile" component={Profile} />
            <Route path="/settings" component={Settings} />*/}
          </Switch>
        </AppContainer>
      <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
