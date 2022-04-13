import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import '../App.css'
import axios from 'axios'

axios.defaults.withCredentials = true;

export default function Userupdate ({ handleLogout }) {
  const [updateinfo, setUpdateinfo] = useState({
    password: '',
    confirmPassword: '',
    nickname: ''
  });
  const history = useHistory();
  const [errormessage, setErrormessage] = useState('')
  const [errormessage2, setErrormessage2] = useState('')
  const handleInputValue = (key) => (e) => {
    setUpdateinfo({ ...updateinfo, [key]: e.target.value });
    validate()
  }
  const validate = () => {
    if (updateinfo.password.length < 6 || updateinfo.password.length > 12) {
      setErrormessage('비밀번호는 6자리 이상 12자리 이하입니다')
    } else if (updateinfo.password !== updateinfo.confirmPassword) {
      setErrormessage('비밀번호가 일치하지 않습니다')
    } else if (updateinfo.nickname.length < 1 || updateinfo.nickname.length > 6) {
      setErrormessage('닉네임은 1자리 이상 6자리 이하입니다')
    } else {
      setErrormessage('')
    }
  }
  const handleClickUpdate = () => {
    if (errormessage==='' && !(updateinfo.password==="") && !(updateinfo.confirmPassword==="") && !(updateinfo.nickname==="")) {
      axios.put('http://ec2-184-73-95-81.compute-1.amazonaws.com/userupdate', {
      id: window.sessionStorage.getItem('id'),
      password: updateinfo.password,
      nickname: updateinfo.nickname
      })
      .then(res => handleLogout())
      .catch(error => setErrormessage2('잘못된 접근입니다'))
    }
  }


  return (
    <div className='signup'>
      <body>
        <h1 className="title">User Update</h1>
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
          <button onClick={handleClickUpdate}>회원정보수정</button>
        </div>
        <div className="errormessage">{errormessage}</div>
        <div className="errormessage">{errormessage2}</div>
      </body>
    </div>
  )
}