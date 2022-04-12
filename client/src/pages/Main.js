import React, { useMemo, useEffect, useState } from 'react'
import Pagination from "react-js-pagination"
import MovieTrailer from '../components/MovieTrailer'
import axios from 'axios'
import jsonData from '../components/item.json'
import MovieModal from '../components/MovieModal'

import '../App.css'

const Main = ({ setSelectgenre, comment, setComment, userinfo }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1)
  const [moviedata, setMoviedata] = useState({
    title: '',
    image: '',
    director: '',
    pubDate: '',
    userRating: ''
  });
  const [getComment, setGetComment] = useState(
    [{
      User: {nickname : ''},
      content: '',
      createdAt: '',
      id: '',
      movie_id: '',
      updatedAt: '',
      user_id: '',
      user_rating: ''
    }]
  )
  const handleMovieData = (data) => {
    setMoviedata({
      title: data.title,
      image: data.image,
      director: data.director,
      pubDate: data.pubDate,
      userRating: ''
    })
  }
  console.log(jsonData.items)
  const handlePageChange = (page) => { 
    setPage(page); 
  };
 
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  
  
  return (
    <div>
      <div>
      <MovieTrailer />
      </div>
      
      <div>
        {jsonData.items.slice(page-1,page+13).map((item) =>
        <span onClick = {() => handleMovieData(item)}>
        <img onClick={openModal} className="movieImage" src={item.image}></img>
        </span>)}  
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
              itemsCountPerPage={1}
              totalItemsCount={66}
              pageRangeDisplayed={15}
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
export default Main;