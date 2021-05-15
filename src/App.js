import logo from './logo.svg';
import './App.css';
import UserLoginComponent from './components/User/UserLoginComponent';
import UserLogin from './controllers/UserLogin';
import ShareList from './controllers/ShareList';
import AddUser from './controllers/AddUser';
import Home from './controllers/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      {/* <UserComponent /> */}
      {/* <UserLoginController /> */}
      {/* <UserLoginComponent /> */}
      {/* <UserCreateAccount /> */}
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
          <Route exact path='/AddUser'>
            <AddUser />
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
