import React, { useState, useEffect } from 'react';
import {Switch, Route, useHistory} from 'react-router-dom'
import Pagination from "react-js-pagination"
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
  const [page, setPage] = useState(1)
  const [selectgenre, setSelectgenre] = useState('0')
  const [movieFilter, setMovieFilter] = useState('');
  const [movieapi, setMovieapi] = useState('');
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
  console.log(page)
  const handleLogout = () => {
    axios.post('https://localhost:4000/signout').then((res) => {
      setUserinfo(null);
      setIsLogin(false);
      history.push('/');
    });
  };

  const handleSearch = async () => {

    const searchKeyword = movieFilter.searchKeyword;
    const searchGenre = selectgenre
    console.log(searchGenre)
    try {
      if (searchKeyword === "") {
        setMovieapi([])
        setMovieFilter("");
        setSelectgenre('')
      } 
      else {
        const data = await axios.get('https://localhost:4000/api/search', 
        {
          params: {
            query: [searchKeyword, searchGenre, page]
          }
        })
        setMovieapi(data.data.items)
      }
    } catch(error) {
      console.log('error')
    }
  }
  useEffect(() => {
    handleSearch()
  }, [selectgenre])

  useEffect(() => {
    handleSearch()
  }, [page])

  useEffect(() => {
    isAuthenticated();
  }, []); 
  
  return (
    <div>
      <Navbar 
        movieFilter={movieFilter}
        setMovieFilter={setMovieFilter}
        handleSearch={handleSearch}
        movieapi={movieapi}
      />
      <Switch>
        <Route exact path="/">
          <Main
            movieapi={movieapi}
            setSelectgenre={setSelectgenre}
            selectgenre={selectgenre}
            setPage={setPage}
            page={page}
          ></Main>
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

