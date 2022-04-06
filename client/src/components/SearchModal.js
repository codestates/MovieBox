import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../App.css"


const SearchModal = ({ movieFilter, setMovieFilter, handleSearch }) => {
    const [searchInput, setSearchInput] = useState('')

    const handleInputValue = (key) => (e) => {
        setMovieFilter({ ...movieFilter, [key]: e.target.value });
    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            buttonClick()
        }
    }

    const buttonClick = () => {
        handleSearch()
    }

    return (

        <div className="search_modal">
            {/* <div className="search_head">
                <div className="search_head_title">
                영화를 검색해주세요.
                </div>
            </div> */}
            <div className="search_body">
                <input type='searchKeyword' className="search_body_contentbox"
                    onChange={handleInputValue('searchKeyword')}
                    onKeyPress={onKeyPress}
                >
                </input>
            </div>
            
            
            
        </div>
    
    )
}

export default SearchModal;
