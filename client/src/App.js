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
  const [page, setPage] = useState(1)
  const [isLogin, setIsLogin] = useState(Boolean(window.sessionStorage.getItem('id')));
  const [selectgenre, setSelectgenre] = useState('0')
  const [movieFilter, setMovieFilter] = useState('');
  const [movieapi, setMovieapi] = useState('');
  const [userinfo, setUserinfo] = useState({
    id: '',
    email: '',
    name: '',
    nickname: ''
  });
  const [comment, setComment] = useState({
    content: '',
    movieId: '',
    userId: ''
  })
  const history = useHistory();
  const isAuthenticated = () => {
    axios.get('https://localhost:4000/auth')
    .then(res => {
      window.sessionStorage.setItem('id', res.data.data.userinfo.id)
      window.sessionStorage.setItem('email', res.data.data.userinfo.email)
      window.sessionStorage.setItem('name', res.data.data.userinfo.name)
      window.sessionStorage.setItem('nickname', res.data.data.userinfo.nickname)
    })
  };
  
  const handleResponseSuccess = (res) => {
    isAuthenticated();
    history.push("/")
  };

  const handleUserinfo = () => {
    setUserinfo({
      id: window.sessionStorage.getItem('id'),
      email: window.sessionStorage.getItem('email'),
      name: window.sessionStorage.getItem('name'),
      nickname: window.sessionStorage.getItem('nickname')
    }, () => console.log(userinfo))
  }

  const handleLogout = () => {
    axios.post('https://localhost:4000/logout').then((res) => {
      window.sessionStorage.setItem('id', '')
      window.sessionStorage.setItem('email', '')
      window.sessionStorage.setItem('name', '')
      window.sessionStorage.setItem('nickname', '')
      setIsLogin(false);
      history.push('/');
    });
  };

  const handleSearch = async () => {

    const searchKeyword = movieFilter.searchKeyword;
    const searchGenre = selectgenre
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
        const rating = data.data.items
        const sortData = rating.sort((a, b) => {
          return b.userRating - a.userRating
        })
        setMovieapi(sortData)
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
    handleUserinfo()
  }, [window.sessionStorage.getItem('id')])

  return (
    <div>
      <Navbar 
        movieFilter={movieFilter}
        setMovieFilter={setMovieFilter}
        handleSearch={handleSearch}
        movieapi={movieapi}
        setIsLogin={setIsLogin}
        isLogin={isLogin}
        handleLogout={handleLogout}
      />
      <Switch>
        <Route exact path="/">
          <Main
            movieapi={movieapi}
            setSelectgenre={setSelectgenre}
            selectgenre={selectgenre}
            setPage={setPage}
            page={page}
            comment={comment}
            setComment={setComment}
            userinfo={userinfo}
          ></Main>
        </Route>
        <Route path="/login">
          <Login
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleResposeSuccess={handleResponseSuccess}
          >
          </Login>
        </Route>
        <Route path="/search">
          <Search
            movieapi={movieapi}
            setSelectgenre={setSelectgenre}
            selectgenre={selectgenre}
            setPage={setPage}
            page={page}
            comment={comment}
            setComment={setComment}
            userinfo={userinfo}
          ></Search>
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

