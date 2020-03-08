import React from "react";
import { graphql } from "react-apollo";
import { GET_BOOK_DETAILS } from "../queries/queries";

function BookDetails(props) {
  const displayBookDetails = () => {
    const { book } = props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map((item, i) => {
              return <li key={i}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  };

  return <div id="book-details">{displayBookDetails()}</div>;
}

// Whenever props is updated, it calls options
export default graphql(GET_BOOK_DETAILS, {
  options: props => {
    console.log("Hey! Looks like you updated bookDetailProps!");
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
