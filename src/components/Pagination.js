import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { log } from 'util';

const BooksPagination = (props) => {
    let pageLinks = [];
    let pageNumber = [];

    let amountOfPages
    for(let i = 1; i <= Math.ceil(props.totalPost/ props.postPerPage); i++) {
        pageNumber.push(i)
    }

    return  (
        <div className="container">
            <div className="row justify-content-center">
                <nav>
                    <ul className="pagination">
                        {pageNumber.map(number => (
                            <li key={number} className="page-item">
                                <a onClick={() => props.nextPage(number)} href="#" className="page-link">
                                    {number}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default BooksPagination;