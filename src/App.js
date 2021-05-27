import logo from './logo.svg';
import './App.css';
import UserLoginComponent from './components/User/UserLoginComponent';
import UserLogin from './controllers/UserLogin';
import ShareList from './controllers/ShareList';
import ShareItem from './controllers/ShareItem';
import AddUser from './controllers/AddUser';
import AddShareList from './controllers/AddShareList';
import AddShareItem from './controllers/AddShareItem';
import Home from './controllers/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Switch>
        <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/UserLogin'>
            <UserLogin />
          </Route>
          <Route exact path='/ShareList'>
            <ShareList />
          </Route>
          <Route exact path='/ShareItem'>
            <ShareItem />
          </Route>
          <Route exact path='/AddUser'>
            <AddUser />
          </Route>
          <Route exact path='/AddShareList'>
            <AddShareList />
          </Route>
          <Route exact path='/AddShareItem'>
            <AddShareItem />
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
