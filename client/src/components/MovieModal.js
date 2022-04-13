import React, {useState, useEffect } from 'react';
import "../App.css"
import axios from 'axios'
import Profile from '../pages/Profile';

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
      axios.post('https://localhost:4000/upload', {
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
        {/* <div className="movie_info"> */}
        <span className="movie_content">
        <div className="movie_info2"> 
            <img className="poster" src={moviedata.image}></img>
        
             
              <div className="movie_info">감독 : {moviedata.director.replace(/\|/g,'')}</div>
            
              <div className="movie_info">개봉 날짜 : {moviedata.pubDate}</div>
            
              <div className="movie_info">평점 : {moviedata.userRating}</div>
              
              </div>
              </span>  
         
          {/* </div> */}
          <div className="modal_comment">
            <div className="usercomment">
          {getComment.map(el => <div>
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
        {/* <footer className="close2">
          <button onClick={close}>
            close
          </button>
        </footer> */}
      </section>
    ) : null}
  </div>
  
  )
}

export default MovieModal;
