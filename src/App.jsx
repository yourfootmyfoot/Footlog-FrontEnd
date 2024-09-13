import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import GlobalStyles from './theme/GlobalStyles';
import theme from './theme/theme';
import Landing from './pages/Landing';
import Login from './pages/Login/Login';
import MatchEnrollForm from './pages/MatchEnroll/MatchEnrollForm';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Match from './pages/Match/Match';
import MatchDetail from './pages/Match/MatchDetail';
import AppContainer from './components/layout/AppContainer/AppContainer';
import Mercenary from './pages/Mercenary/pages/MercenaryChoice';
import MercenaryAppList from './pages/Mercenary/pages/MercenaryApp/MercenaryAppList';
import MercenaryRecList from './pages/Mercenary/pages/MercenaryRec/MercenaryRecList';
import ClubList from './pages/ClubList/pages/ClubList';
import Settings from './pages/Settings/Settings';
import EnrollMercenaryApp from './pages/Mercenary/pages/EnrollMercenaryApp/EnrollMercenaryApp';

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
            <Route path="/EnrollMercenaryApp" component={EnrollMercenaryApp} />
            <Route path="/ClubList" component={ClubList} />
            <Route path="/match-enroll" component={MatchEnrollForm} />
            {/*<Route path="/club" component={Club} />
            <Route path="/profile" component={Profile} />*/}
            <Route path="/settings" component={Settings} />
          </Switch>
        </AppContainer>
      <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;