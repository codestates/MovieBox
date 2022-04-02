import React, { useState, useEffect } from 'react';
import {Switch, Route, useHistory} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Singup'
import Main from './pages/Main'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Userupdate from './pages/Userupdate'
import axios from 'axios'

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const history = useHistory();
  const isAuthenticated = () => {
    axios.get('https://localhost:4000/auth')
    .then(res => {
      setUserinfo(res.data.data.userinfo)
    })
    setIsLogin(true)
  };
  const handleResponseSuccess = (res) => {
    isAuthenticated();
    history.push("/")
  };
  console.log(userinfo)
  console.log(isLogin)

  const handleLogout = () => {
    axios.post('https://localhost:4000/signout').then((res) => {
      setUserinfo(null);
      setIsLogin(false);
      history.push('/');
    });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);
  
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Main></Main>
        </Route>
        <Route path="/login">
          <Login
            isLogin={isLogin}
            handleResposeSuccess={handleResponseSuccess}
          >
          </Login>
        </Route>
        <Route path="/search">
          <Search></Search>
        </Route>
        <Route path="/signup">
          <Signup
            isLogin={isLogin}
          ></Signup>
        </Route>
        <Route path="/profile" >
          <Profile></Profile>
        </Route>
        <Route path="/userupdate">
          <Userupdate></Userupdate>
        </Route>
      </Switch>
    </div>
  );
}

