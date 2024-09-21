import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import GlobalStyles from './theme/GlobalStyles';
import theme from './theme/theme';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppContainer from './components/layout/AppContainer/AppContainer';

// Page components
import Landing from './pages/Landing';
import Login from './pages/Login/Login';
import Match from './pages/Match/Match';
import MatchDetail from './pages/Match/MatchDetail';
import MatchEnrollForm from './pages/MatchEnroll/MatchEnrollForm';
import ChatRoomListPage from './pages/Chat/ChatRoomListPage';
import ClubList from './pages/ClubList/pages/ClubList';
import ChatRoomPage from './pages/Chat/ChatRoomPage'; 
import Settings from './pages/Settings/Settings';

// Mercenary related components
import Mercenary from './pages/Mercenary/pages/MercenaryChoice';
import MercenaryAppList from './pages/Mercenary/pages/MercenaryApp/MercenaryAppList';
import MercenaryRecList from './pages/Mercenary/pages/MercenaryRec/MercenaryRecList';

import Profile from './pages/Profile/Profile';
import EnrollMercenaryApp from './pages/Mercenary/pages/EnrollMercenaryApp/EnrollMercenaryApp';
import EnrollMercenaryRec from './pages/Mercenary/pages/EnrollMercenaryRec/EnrollMercenaryRec';


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppContainer>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />

            
            {/* Match related routes */}
            <Route exact path="/match" component={Match} />
            <Route path="/match/detail" component={MatchDetail} />
            <Route path="/match/enroll" component={MatchEnrollForm} />
            
            {/* Mercenary related routes */}
            <Route exact path="/mercenary" component={Mercenary} />
            <Route path="/mercenary/app-list" component={MercenaryAppList} />
            <Route path="/mercenary/rec-list" component={MercenaryRecList} />
            <Route path="/mercenary/enroll-app" component={EnrollMercenaryApp} />
            <Route path="/mercenary/enroll-rec" component={EnrollMercenaryRec} />
            
            <Route path="/club-list" component={ClubList} />
            <Route exact path="/chat" component={ChatRoomListPage} />
            <Route path="/chat/:id" component={ChatRoomPage} />
            <Route path="/settings" component={Settings} />
            
            <Route path="/profile" component={Profile} /> 
            {/* Uncomment these routes when components are ready */}
            {/*<Route path="/club" component={Club} />*/}
          </Switch>
        </AppContainer>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;