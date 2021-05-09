import logo from './logo.svg';
import './App.css';
import UserComponent from './components/User/UserComponent';
import UserLoginComponent from './components/User/UserLoginComponent';
import UserCreateAccount from './components/User/UserCreateAccount';


function App() {
  return (
    <div className="App">
      {/* <UserComponent /> */}
      <UserLoginComponent />
      {/* <UserCreateAccount /> */}
    </div>
  );
}

export default App;
