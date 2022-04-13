import React, { useState, useEffect } from 'react'
import axios from 'axios'
import S3Upload from '../components/S3Upload'

const Profile = ({ userinfo, userimage, setUserimage, handleLogout }) => {

  const [uploadimage, setUploadimage] = useState(userimage)
  const [usercomment, setUsercomment] = useState([{
    content: '',
    movie_id: '',
    updatedAt: ''
  }])

  const deleteFileImage = () => {
    URL.revokeObjectURL(userimage);
    axios.put('http://ec2-184-73-95-81.compute-1.amazonaws.com/userimage', {
      id: window.sessionStorage.getItem('id'),
      image : 'default.png'
    })
  };

  const deleteUser = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      axios.delete('http://ec2-184-73-95-81.compute-1.amazonaws.com/deleteuser', {
        params : {
          query : sessionStorage.getItem('id')
        }
      })
      .then(res => {
        handleLogout()
      })
    } else {
      console.log('취소')
    }
  }

  useEffect(() => {
    axios.get('http://ec2-184-73-95-81.compute-1.amazonaws.com/getimage', {
      params: {
        query: window.sessionStorage.getItem('id')
      }
    }).then(res => setUploadimage(res.data))
  })

  useEffect(() => {
    axios.get('http://ec2-184-73-95-81.compute-1.amazonaws.com/usercomment', {
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
        <img src={`https://moviebox-bucket.s3.ap-northeast-2.amazonaws.com/upload/${uploadimage}`}  className="profile_image" style={{ margin: "auto" }}></img>
        <span className="profile_label">닉네임 : {userinfo.nickname}</span>
        
        
          <div className="introduce"></div>
          <div className="change_userinfo">
            <div>
              <S3Upload 
                setUserimage={setUserimage}
                userimage={userimage}
              />
              <button className="profile_image_button" onClick={deleteFileImage}>프로필 사진 삭제</button>
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
          <div className="teewt_uesrproflie">
            <img src={`https://moviebox-bucket.s3.ap-northeast-2.amazonaws.com/upload/${uploadimage}`} />
          </div>
          <div className="user_content">
            <span className="user_moviename">영화 제목 : {el.movie_id}</span>
            <span className="user_updatedAt">{el.updatedAt.replace("T"," ").slice(0,19)}</span>
          
          <div className="user_content">{el.content}</div>
          </div>
        </span>
        )}
        </div>
        </span>
    </div>
  )

}

export default Profile