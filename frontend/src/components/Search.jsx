import React, {useState} from 'react'
import {FormField} from '../components';


const Search = ({searchText, setSearchText, allPost, setSearchResults, searchTimeOut, setSearchTimeOut}) => {
    // const [searchTimeOut, setSearchTimeOut] = useState(null);

    const handleSearch = (e) => {
        clearTimeout(searchTimeOut);
        setSearchText(e.target.value);
    
        setSearchTimeOut(
            setTimeout(()=>{
                const searchResults = allPost.filter((item)=> item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()) || item.category.toLowerCase().includes(searchText.toLowerCase()));
    
                setSearchResults(searchResults);
            }, 500)
        )
    }


    return (
        <FormField
        name='text'
        type='search'
        value={searchText}
        handleChange={handleSearch}
        placeholder={'Serch your images here'}
        search
        />
    )
}

export default Search