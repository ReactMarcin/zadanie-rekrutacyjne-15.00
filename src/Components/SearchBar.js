import React from 'react'

const SearchBar = ({ term, handleChange }) => (

        <div className="search">
            <div className="form-container">
                <div style={{padding: '20px', width: '100%', maxWidth: '500px'}}>
                    <form>
                        <input 
                            placeholder="Search by name ..."
                            type="text"
                            value={term}
                            onChange={handleChange}
                        />
                    </form>
                </div>
            </div>
        </div>
)
export default SearchBar