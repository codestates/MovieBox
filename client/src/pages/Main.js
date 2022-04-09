import React, { useMemo, useEffect, useState } from 'react'
import Pagination from "react-js-pagination"
import MovieModal from '../components/MovieModal'
import MovieTrailer from '../components/MovieTrailer'
import axios from 'axios'
import jsonData from '../components/item.json'
import MovieCard from '../components/MovieCard'
import { Row, Col } from 'antd';
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
      <Row>
          {jsonData.items.map((item) => {
            return (
              <Col xs={24} sm={12} md={6} lg={4} xl={4}>
                <MovieCard item={item}></MovieCard>;
              </Col>
            );
          })}
        </Row>
        </div>
      </React.Fragment>
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
export default Main;