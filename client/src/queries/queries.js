import { gql } from "apollo-boost";

// *---------*  QUERIES *---------*
const GET_BOOKS = gql`
  {
    books {
      name
      genre
      id
      author {
        name
      }
    }
  }
`;

const GET_BOOK_DETAILS = gql`
  query($id: ID!) {
    book(id: $id) {
      name
      genre
      author {
        name
        books {
          name
        }
      }
    }
  }
`;

const GET_AUTHORS = gql`
  {
    authors {
      name
      id
    }
  }
`;

// *---------* MUTATIONS *---------*
const ADD_BOOK = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export { GET_BOOKS, GET_AUTHORS, ADD_BOOK, GET_BOOK_DETAILS };
