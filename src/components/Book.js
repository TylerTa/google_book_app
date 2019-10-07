import React, { Component } from 'react';

import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { tsConstructorType } from '@babel/types';

class Book extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse}));
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="card shadow mb-4 col-lg-10">
                        <div className="card-header">
                            {this.props.authors.map(author => {
                                return <span key={this.props.i}>{author}, </span>
                            })}
                            <span>{this.props.title}</span>
    
                            <button color="primary" className="btn btn-sm btn-primary float-right" onClick={this.toggle}>Expand</button>
                        </div>
                        <Collapse isOpen={this.state.collapse}>
                            <div className="card-body">
                                <p>Descriptions: {this.props.description}</p>
                                <p>Publisher: {this.props.publisher}</p>
                                <p>Published: {this.props.publishedDate}</p>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </div>
            
        );
    }
    
}

export default Book;