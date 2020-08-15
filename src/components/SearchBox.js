import React from 'react';
import './SearchBox.css';
import search from './search.svg'
import SearchIcon from '@material-ui/icons/Search';

const SearchBox = ({searchChange, onRequestRobots, searchField}) => {
	return (

<div class="sb-example-1">
         <div class="search">
            <input type="text" class="searchTerm" placeholder="What are you looking for?" onChange={searchChange}></input>
            <button type="submit" class="searchButton" onClick={() => onRequestRobots("https://jsonmock.hackerrank.com/api/movies/search/?Title="+searchField)}>
              <SearchIcon />
           </button>
         </div>
      </div>
		);
}

export default SearchBox;