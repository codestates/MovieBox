import React from 'react';
import "../App.css"
import axios from 'axios'

const MovieModal = ({ open, close, moviedata, comment, setComment, userinfo, getComment }) => {

  const handleInputValue = (key) => (e) => {
    setComment({
      ...comment, 
      [key]: e.target.value, 
      movieId: moviedata.title.replace(/<b>/gi,"").replace(/<\/b>/gi,""), 
      userId: userinfo.id
    })
  }
  
  const handleUploadComment = () => {
    if (userinfo.id) {
      axios.post('http://ec2-184-73-95-81.compute-1.amazonaws.com/upload', {
        content: comment.content,
        movie_id: comment.movieId,
        user_id: comment.userId
      })
    } else {
      console.log('로그인이 필요합니다')
    }
    console.log(userinfo)
  }

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
    {open ? (
      <section>
        <header className="title">
          {moviedata.title.replace(/<b>/gi,"").replace(/<\/b>/gi,"")}
          <button className="close" onClick={close}>
            &times;
          </button>
        </header>
        <main>
        <span className="movie_content">
        <div className="movie_info2"> 
            <img className="poster" src={moviedata.image}></img>
        
             
              <div className="movie_info">감독 : {moviedata.director.replace(/\|/g,'')}</div>
            
              <div className="movie_info">개봉 날짜 : {moviedata.pubDate}</div>
            
              <div className="movie_info">평점 : {moviedata.userRating}</div>
              
              </div>
              </span>  
  
          <div className="modal_comment">
            <div className="usercomment">
          {getComment.map(el => <div>
            <div className="teewt_uesrproflie">
            <img src={`https://moviebox-bucket.s3.ap-northeast-2.amazonaws.com/upload/${el.User.image}`} />
            </div>
            <span className="user_moviename">{el.User.nickname}</span>
            <span className="user_updatedAt">{el.updatedAt.replace("T"," ").slice(0,19)}</span>
            <div className="user_content">{el.content}</div>
              </div>)}
            </div>
          </div>
            
          <div>
            <div className="modal_input_container">
            <input className="modal_input" type="text" onChange={handleInputValue("content")} ></input>
            </div>
            <span>
              <button className="modal_button" onClick={handleUploadComment} >submit</button>
            </span>
          </div>
        </main>
      </section>
    ) : null}
  </div>
  
  )
}

export default MovieModal;
