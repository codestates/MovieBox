import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = ({ userinfo, userimage, setUserimage, handleLogout }) => {

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

  const deleteUser = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      axios.delete('https://localhost:4000/deleteuser', {
        params : {
          query: window.sessionStorage.getItem('id')
        }
      }).then(res => {
        handleLogout()
      })
    } else {
      console.log('취소')
    }
  }

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
      <span className="profile">
        <div className="profile_tab">
          <div className="intput-div">
        <img src={require(`../public/img/${uploadimage}`)}  className="profile_image" style={{ margin: "auto" }}></img>
        <span className="profile_label">닉네임 : {userinfo.nickname}</span>
        
        
          <div className="introduce"></div>
          <div className="change_userinfo"><input onChange={saveFileImage} type="file" accept="image/*" />
            <div>
              <button className="profile_image_button" onClick={uploadImage}>업로드</button>
              <button className="profile_image_button" onClick={deleteFileImage}>삭제</button>
                </div>
              
            
          

            <div>
            <a href="/userupdate">
              <button className="profile_button">회원정보 변경</button>
              </a>
            </div>

          <div className="withdraw">
            <button className="profile_button" onClick={deleteUser}>회원탈퇴</button>
              </div>
              
            </div>
          </div>
        </div>
      {/* </span> */}
      <div className="comment">
        {usercomment.map(el => 
        <span className="user_comment">
          <span>{el.movie_id}</span>
          <span>{el.updatedAt}</span>
          <div>{el.content}</div>
        </span>
        )}
        </div>
        </span>
    </div>
  )

}

export default Profile