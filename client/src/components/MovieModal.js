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
  // console.log(getComment)
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
        <header>
          {moviedata.title.replace(/<b>/gi,"").replace(/<\/b>/gi,"")}
          <button className="close" onClick={close}>
            &times;
          </button>
        </header>
        <main>
          <div>
            <img src={moviedata.image}></img>
            <div>{moviedata.director.replace(/\|/g,'')}</div>
            <div>{moviedata.pubDate}</div>
          </div>

          {getComment.map(el => <div>
            <div>{el.updatedAt}</div>
            <div>{el.User.nickname}</div>
            <div>{el.content}</div>
            </div>)}
          <div>
            <span>
              <input type="content" onChange={handleInputValue("content")} ></input>
            </span>
            <span>
              <button onClick={handleUploadComment} >submit</button>
            </span>
          </div>
        </main>
        <footer>
          <button className="close" onClick={close}>
            close
          </button>
        </footer>
      </section>
    ) : null}
  </div>
  
  )
}

export default MovieModal;
