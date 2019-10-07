import React from 'react';
import request from 'react-request';

const SearchBooks = (props) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <section className="col-6">
                    <form onSubmit={props.handleSubmit}>
                        <div className="form-group input-group d-small-inline-block">
                            <input name="searchBook"  placeholder="Seach Books" type="text" className="form-control" onChange={props.handleChange}/>
                            <div className="input-group-append"> 
                                <button className="btn btn-sm btn-primary" type="submit">Search</button>
                            </div>
                        </div> 
                    </form>
                </section>
            </div>
        </div>
    )
}

export default SearchBooks;