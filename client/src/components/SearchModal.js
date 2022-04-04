import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css"


const SearchModal=() => {
    
    return (

        <div className="search_modal">
            {/* <div className="search_head">
                <div className="search_head_title">
                영화를 검색해주세요.
                </div>
            </div> */}
            <div className="search_body">
                <input className="search_body_contentbox">
                
                </input>
            </div>
            
            
            
        </div>
    
    )
}

export default SearchModal;
