import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import '../App.css'
import axios from 'axios'

axios.defaults.withCredentials = true;

export default function Signup () {
  const [userinfo, setUserinfo] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  });
  const history = useHistory();
  const [errormessage, setErrormessage] = useState('')
  const [errormessage2, setErrormessage2] = useState('')
  const handleInputValue = (key) => (e) => {
    setUserinfo({ ...userinfo, [key]: e.target.value });
  }
  const validate = () => {
    if (!validateEmail(userinfo.email) || userinfo.email.length === 0) {
      setErrormessage('이메일 형식이 유효하지 않습니다')
    } else if (userinfo.name.length === 0) {
      setErrormessage('이름을 입력하세요')
    } else if (userinfo.password.length < 6 || userinfo.password.length > 12) {
      setErrormessage('비밀번호는 6자리 이상 12자리 이하입니다')
    } else if (userinfo.password !== userinfo.confirmPassword) {
      setErrormessage('비밀번호가 일치하지 않습니다')
    } else if (userinfo.nickname.length < 1 || userinfo.nickname.length > 6) {
      setErrormessage('닉네임은 1자리 이상 6자리 이하입니다')
    } else {
      setErrormessage('')
    }
  }
  const handleClickSignup = () => {
    validate()
    if (!errormessage) {
      axios.post('https://localhost:4000/signup', {
        email: userinfo.email,
        password: userinfo.password,
        name: userinfo.name,
        nickname: userinfo.nickname
      })
      .then(res => history.push("/login"))
      .catch(error => setErrormessage2('이미 생성된 이메일입니다'))
    }
  }
  function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }
  return (
    <div className='signup'>
      <body>
        <h2>Sign Up</h2>
        <div>
          <input type="email" onChange={handleInputValue('email')} placeholder="이메일"></input>
        </div>
        <div>
          <input type="name" onChange={handleInputValue('name')} placeholder="이름"></input>
        </div>
        <div>
          <input type="password" onChange={handleInputValue('password')} placeholder="패스워드"></input>
        </div>
        <div>
          <input type="password" onChange={handleInputValue('confirmPassword')} placeholder="패스워드 확인"></input>
        </div>
        <div>
          <input type="nickname" onChange={handleInputValue('nickname')} placeholder="닉네임"></input>
        </div>
        <div>
          <button onClick={handleClickSignup}>signup</button>
        </div>
        <div>{errormessage}</div>
        <div>{errormessage2}</div>
        <div>이미 아이디가 있으신가요? <a href="/login">login</a></div>
      </body>
    </div>
  )
}