import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = ({ userinfo, userimage, setUserimage }) => {

  const [uploadimage, setUploadimage] = useState(userimage)
  const [usercomment, setUsercomment] = useState([{
    content: '',
    movie_id: '',
    updatedAt: ''
  }])

  const saveFileImage = (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0])
    console.log(formData)
    console.log(userimage)
    axios.post('https://localhost:4000/imageUpload', formData)
    .then(res => {
      console.log(res.data.fileName)
      setUserimage(res.data.fileName)
    })
  }

  const uploadImage = () => {
    axios.put('https://localhost:4000/userimage', {
      id: window.sessionStorage.getItem('id'),
      image : userimage
    })
  }

  const deleteFileImage = () => {
    URL.revokeObjectURL(userimage);
    axios.put('https://localhost:4000/userimage', {
      id: window.sessionStorage.getItem('id'),
      image : 'default.png'
    })
  };

  useEffect(() => {
    axios.get('https://localhost:4000/getimage', {
      params: {
        query: window.sessionStorage.getItem('id')
      }
    }).then(res => setUploadimage(res.data))
  })

  useEffect(() => {
    axios.get('https://localhost:4000/usercomment', {
      params: {
        query: window.sessionStorage.getItem('id')
      }
    }).then(res => setUsercomment(res.data))
  }, [])
  

  return (
    <div>
      <span>
        <img src={require(`../public/img/${uploadimage}`)}  className="profile_image" style={{ margin: "auto" }}></img>
        <span className="profile_nickname">{userinfo.nickname}</span>
        <div>
          <div className="introduce"></div>
          <div className="change_userinfo"><input onChange={saveFileImage} type="file" accept="image/*" />
            <div>
              <button onClick={uploadImage}>업로드</button>
              <button onClick={deleteFileImage}>삭제</button>
            </div>
          </div>
          <div className="change_userimage">
            <button>회원정보 변경</button>
          </div>
          <div className="withdraw">
            <button>회원탈퇴</button>
          </div>
        </div>
      </span>
        {usercomment.map(el => 
        <ul className="user_comment">
          <span>{el.movie_id}</span>
          <span>{el.updatedAt}</span>
          <div>{el.content}</div>
        </ul>
        )}
      <span>

      </span>
    </div>
  )

}

export default Profile