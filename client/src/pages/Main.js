import React, { useMemo, useEffect, useState } from 'react'
import Pagination from "react-js-pagination"
import MovieModal from '../components/MovieModal'
import MovieTrailer from '../components/MovieTrailer'
import axios from 'axios'
import jsonData from '../components/item.json'
import MovieCard from '../components/MovieCard'

import '../App.css'

const Main = ({ setSelectgenre, setPage, page, comment, setComment, userinfo }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [getComment, setGetComment] = useState(
    [{
      content: '',
      createdAt: '',
      id: 32,
      movie_id: '',
      updatedAt: '',
      user_id: 1,
      user_rating: null
    }]
  )

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
      <React.Fragment>
      <div>
         
          {jsonData ? jsonData.items.slice(page-1,page+13).map((item) => 
          <span onClick = {() => handleMovieData(item)}>
          <img onClick={openModal} className="movieImage" src={item.image}></img>
          </span>): null}
            
        
        </div>
      </React.Fragment>
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