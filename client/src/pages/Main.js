import React, { useMemo, useEffect } from 'react'
import Pagination from "react-js-pagination"
import '../App.css'

const Main = ({ movieapi, setSelectgenre, setPage, page }) => {
  const values = ["전체", "드라마", "판타지", "서부", "공포",
   "로맨스", "모험", "스릴러", "느와르", "컬트", "다큐멘터리", 
   "코미디", "가족", "미스터리", "전쟁", "애니메이션", "범죄", 
   "뮤지컬", "SF", "액션", "무협", "에로", "서스펜스",
  "서사", "블랙코미디", "실험", "영화카툰", "영화음악", "영화패러디포스터"]

  const handlePageChange = (page) => { 
    setPage(page); 
  };
  
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
        {movieapi ? movieapi.map(el => <span>
          <span className="movieTitle">{el.title.replace(/<b>/gi,"").replace(/<\/b>/gi,"")}</span>
          <img className="movieImage" src={el.image}></img>
        </span>): null}
      </div>
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