import React, { useState } from 'react';
import '../App.css'
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function Login ({ handleResposeSuccess }) {
  const [userinfo, setUserinfo] = useState({
    email: '',
    password: '',
  });
  const [errormessage, setErrormessage] = useState('')
  const [errormessage2, setErrormessage2] = useState('')
  const handleInputValue = (key) => (e) => {
    setUserinfo({ ...userinfo, [key]: e.target.value });
  }
  const handleClickEvent = () => {
    if (!userinfo.email || !userinfo.email) {
      setErrormessage('이메일과 비밀번호를 입력해야 합니다')
    } else {
      setErrormessage('')
    }
    if (!errormessage) {
      axios.post('https://localhost:4000/login',{
        email: userinfo.email,
        password: userinfo.password
      })
      .then(res => {
        handleResposeSuccess(res.data)
      })
      .catch(error => setErrormessage2('비밀번호가 일치하지 않습니다'))
    }
  }

  return (
    <div className='login'>
      <body>
        <h2>Login</h2>
        <div>
          <input type="email" onChange={handleInputValue('email')} placeholder="이메일"></input>
        </div>
        <div>
          <input type="password" onChange={handleInputValue('password')} placeholder="패스워드"></input>
        </div>
        <div>
          <button onClick={handleClickEvent}>login</button>
        </div>
        <div>{errormessage}</div>
        <div>{errormessage2}</div>
        <div>OR</div>
        <div onClick={handleClickEvent}>sign in Google</div>
        <div onClick={handleClickEvent}>sign in Naver</div>
      </body>
    </div>
  )
}