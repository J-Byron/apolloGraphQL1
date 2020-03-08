import React, { useState } from "react";
import { graphql, useMutation } from "react-apollo";
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "../queries/queries";

function BookForm({ data: { loading, authors } }) {
  const [bookName, setbookName] = useState("");
  const [bookGenre, setbookGenre] = useState("");
  const [author, setauthor] = useState("Select author");
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }]
  });

  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={({ target: { value } }) => setbookName(value)}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={({ target: { value } }) => setbookGenre(value)}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={({ target: { value } }) => setauthor(value)}>
          <option>Select author</option>
          {!loading &&
            authors.map(author => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
        </select>
      </div>
      <button
        type="button"
        onClick={() => {
          author != "Select author" &&
            addBook({
              variables: { name: bookName, genre: bookGenre, authorId: author }
            });
        }}
      >
        +
      </button>
    </form>
  );
}

export default graphql(GET_AUTHORS)(BookForm);
