import React, { useState } from "react";
import { graphql } from "react-apollo";
import { GET_BOOKS } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList({ data: { loading, books = [] } }) {
  const [selectedBookId, setselectedBookId] = useState(null);
  console.log("rendering booklist");
  return (
    <div>
      <ul id="book-list">
        {loading ? (
          <div> loading... </div>
        ) : (
          books.map(book => (
            <li key={book.id} onClick={() => setselectedBookId(book.id)}>
              {book.name} - {book.author.name}
            </li>
          ))
        )}
      </ul>
      <div> Book details </div>
      {selectedBookId && <BookDetails bookId={selectedBookId} />}
    </div>
  );
}

export default graphql(GET_BOOKS)(BookList);
