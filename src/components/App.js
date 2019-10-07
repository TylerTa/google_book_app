import React, { Component } from "react";
import Nav from "./Nav";
import SearchBooks from "./SearchBooks";
import BookResultsTable from "./BookResultsTable";
import BookList from "./BookList";
import BooksPagination from "./Pagination";
// import request from 'react-request';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      searchTerm: "",
      totalResult: 0,
      listOfAuthors: [],
      commonAuthor: "",
      earlestPublication: "",
      recentPublication: "",
      serverResponseTime: 0,
      currentPage: 1,
      startIndex: 0,
      maxResult: 10,
      postPerPage: 15
    };
  }

  handleSubmit = e => {
    const startTime = new Date();
    e.preventDefault();
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTerm}&orderBy=newest&maxResults=${this.state.maxResult}`
    )
      .then(data => {
        console.log(`this is data: ${JSON.stringify(data.headers)}`)
        const totalTime = new Date() - startTime;
        this.setState({ serverResponseTime: totalTime })
        return data.json();
      })
      .then(data => {
        this.setState({ books: [...data.items] });
        this.setState({ totalResult: data.totalItems });
        // this.setState({
        //   earlestPublication:
        //     data.items[data.items.length - 1].volumeInfo.publishedDate
        // });
        // this.setState({
        //   recentPublication: data.items[0].volumeInfo.publishedDate
        // });

        let listOfPublishedDate = [];
        data.items.map(data => {
          listOfPublishedDate.push(data.volumeInfo.publishedDate);
        })

        this.setState({
          earlestPublication: listOfPublishedDate[listOfPublishedDate.length - 1]
        });

        this.setState({
          recentPublication: listOfPublishedDate[0]
        });



        let listOfAuthors = [];
        data.items.map(data => {
          listOfAuthors.push(data.volumeInfo.authors);
        });

        let count = 1,
          tempCount;
        let mostCommon = listOfAuthors[0];
        let temp = 0;

        for (let i = 0; i < listOfAuthors.length; i++) {
          temp = listOfAuthors[i];
          tempCount = 0;
          for (let j = 1; j < listOfAuthors.length; j++) {
            if (temp == listOfAuthors[j]) {
              tempCount++;
            }
            if (tempCount > count) {
              mostCommon = temp;
              count = tempCount;
            }
          }
        }

        this.setState({ commonAuthor: mostCommon });
        
      });
  };

  handleChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  nextPage = pageNumber => {
    if (pageNumber === 1) {
      this.setState({ startIndex: 0 });
    } else {
      this.setState({ startIndex: (pageNumber - 1) * 10 });
    }

    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTerm}&orderBy=newest&startIndex=${this.state.startIndex}&maxResults=${this.state.maxResult}`
    )
      .then(data => data.json())
      .then(data => {
        this.setState({ books: [...data.items] });
        this.setState({ totalResult: data.totalItems });
        this.setState({ currentPage: pageNumber });
      });
  };

  render() {
    const numberOfPages = Math.floor(this.state.totalResult / 10);
    return (
      <div className="App">
        <Nav />
        <SearchBooks
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        <BookResultsTable
          totalResult={this.state.totalResult}
          commonAuthor={this.state.commonAuthor}
          earlestPublication={this.state.earlestPublication}
          recentPublication={this.state.recentPublication}
          serverResponseTime={this.state.serverResponseTime}
        />
        <BookList books={this.state.books} />
        {this.state.totalResult > 10 ? (
          <BooksPagination
            postPerPage={this.state.postPerPage}
            totalPost={this.state.totalResult}
            pages={numberOfPages}
            nextPage={this.nextPage}
            currentPage={this.state.currentPage}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
