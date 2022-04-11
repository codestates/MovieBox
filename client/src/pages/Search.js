import React, { useMemo, useEffect, useState } from 'react'
import Pagination from "react-js-pagination"
import MovieModal from '../components/MovieModal'
import axios from 'axios'
import '../App.css'

const Search = ({ movieapi, setSelectgenre, setPage, page, comment, setComment, userinfo }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [getComment, setGetComment] = useState(
    [{
      User: {nickname : ''},
      content: '',
      createdAt: '',
      id: '',
      movie_id: '',
      updatedAt: '',
      user_id: '',
      user_rating: null
    }]
  )

  const [moviedata, setMoviedata] = useState({
    title: '',
    image: '',
    director: '',
    pubDate: '',
    userRating: ''
  });
  const values = ["전체", "드라마", "판타지", "서부", "공포",
   "로맨스", "모험", "스릴러", "느와르", "컬트", "다큐멘터리", 
   "코미디", "가족", "미스터리", "전쟁", "애니메이션", "범죄", 
   "뮤지컬", "SF", "액션", "무협", "에로", "서스펜스",
  "서사", "블랙코미디", "실험", "영화카툰", "영화음악", "영화패러디포스터"]

  const handlePageChange = (page) => { 
    setPage(page); 
  };

  const handleMovieData = (data) => {
    setMoviedata({
      title: data.title,
      image: data.image,
      director: data.director,
      pubDate: data.pubDate,
      userRating: data.userRating
    })
  }
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect (() => {
      axios.get('https://localhost:4000/content', {
      params: {
        query: moviedata.title
      }
    })
    .then((res) => {
      setGetComment(res.data)
    })
  })

  
  return (
    <div>
      <div>
        <span className="sort">
          <span>sort</span>
          <select
            onChange={(value) => {
              setSelectgenre(value.target.value)
            }}
          >
            {values.map((el, idx) => <option value={idx} >{el}</option>)}
          </select>
        </span>
      </div>
      <div>
        {movieapi ? movieapi.map(el => <span onClick={() => handleMovieData(el)}>
          <img onClick={openModal} className="poster" src={el.image}></img>
        </span>): null}
      </div>
      <MovieModal 
        open={modalOpen}
        close={closeModal}
        moviedata={moviedata}
        comment={comment}
        setComment={setComment}
        userinfo={userinfo}
        getComment={getComment}
        handleMovieData={handleMovieData}
        header="Modal heading">
      </MovieModal>
      <div className="Pagination">
        <ul>
          <li>
            <Pagination
              activePage={page}
              itemsCountPerPage={20}
              totalItemsCount={1000}
              pageRangeDisplayed={10}
              prevPageText={"<"}
              nextPageText={">"}
              onChange={handlePageChange}
            />
          </li>
        </ul>
      </div>
    </div>
    )
  }
export default Search;