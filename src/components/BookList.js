import React from 'react';
import Book from './Book';

const BookList = (props) => {
    return (
        <div className="container">
        <div className="row">
            <div className="col">
                {
                    props.books.map((book, i) => {
                        return (
                            <Book 
                                key={i}
                                title={book.volumeInfo.title}
                                authors={book.volumeInfo.authors}
                                description={book.volumeInfo.description}
                                publisher={book.volumeInfo.publisher}
                                publishedDate={book.volumeInfo.publishedDate}
                            />
                        )
                    })
                }
            </div>
        </div>
    </div>
    )
}

export default BookList;