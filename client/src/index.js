import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import './App';
import Login from './pages/Login'
import Signup from './pages/Singup'
import Main from './pages/Main'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Userupdate from './pages/Userupdate'

class App  extends Component{
  render() {
    return (
      <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userupdate" element={<Userupdate />} />
      </Routes>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(

<App />
,
document.getElementById('root')
);

