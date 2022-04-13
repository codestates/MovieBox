import React from 'react';
import { useHistory } from 'react-router-dom';
import "../App.css"


const SearchModal = ({ movieFilter, setMovieFilter, handleSearch }) => {
    const history = useHistory();
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
        history.push('/search')
    }

    return (
        <div className="search_modal">
            <div className="search_body">
                <input type='searchKeyword' className="search_body_contentbox"
                    onChange={handleInputValue('searchKeyword')}
                    onKeyPress={onKeyPress}
                    placeholder="영화 제목을 검색하세요."
                >
                </input>
            </div>
        </div>
    
    )
}

export default SearchModal;
