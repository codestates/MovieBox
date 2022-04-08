import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../App.css"


const SearchModal = ({ movieFilter, setMovieFilter, handleSearch }) => {
    const [searchInput, setSearchInput] = useState('')

    const handleInputValue = (key) => (e) => {
        setMovieFilter({ ...movieFilter, [key]: e.target.value });
    }

    // Enter를 눌렀을 때 페이지네이션, 장르가 초기화되야함.
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
