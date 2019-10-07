import React from 'react';

const BookResultsTable = (props) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card shadow mb-4 col-lg-10">
                    <div className="card-header py-3">
                        <p>Number of Results: {props.totalResult}</p>
                        <p>Most Common Author: {props.commonAuthor}</p>
                        <p>Earliest Publication: {props.earlestPublication}</p>
                        <p>Recent Publication: {props.recentPublication}</p>
                        <p>Server Response Time: {props.serverResponseTime} ms</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookResultsTable;