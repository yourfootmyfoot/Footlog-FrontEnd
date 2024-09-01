// src/App.jsx

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Header from './components/Layout/Header';
// import Footer from './components/Layout/Footer';
import Landing from './pages/Landing';
import MatchDetail from './pages/match/MatchDetail';

const App = () => {
  return (
    <Router>
     {/*  <Header /> */}
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
      <MatchDetail></MatchDetail>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
