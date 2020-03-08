// *---------*  Imports *---------*

//  This file will describe the GQL schema
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull // Requires fields
} = graphql;
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

// *---------* Data source (Dummy) *---------*

// var booksList = [
//   { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
//   { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
//   { name: "The long earth", genre: "Sci-fi", id: "3", authorId: "3" }
// ];

// var authorsList = [
// { name: "Patrick Rothfuss", age: 44, id: "1" },
// { name: "Brandon Sanderson", age: 42, id: "2" },
// { name: "Terry Pratchett", age: 66, id: "3" }
// ];

// *---------* Graphs *---------*

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: parent => {
        // return _.find(authorsList, { id: parent.authorId });
        return Author.findById(parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve: parent => {
        return Book.find({ authorId: parent.id });
      }
    }
  })
});

// *---------* Root *---------*

// This is the root of the graph; where a user must start in order to get data from a graph. This is the query the client communicates with
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  // Doesn't need a function because order doesn't matter
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Author.findById(args.id);
      }
    },

    books: {
      type: GraphQLList(BookType),
      resolve: () => {
        // return booksList;
        return Book.find({});
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve: () => {
        // return authorsList;
        return Author.find({});
      }
    }
  }
});

/**
 * * query example ...
 * * book(id:123){ name, genre, ...}
 */

// *---------* Mutation *---------*

// Mutations are a type of query that write  data
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (_, args) => {
        const author = new Author({
          name: args.name,
          age: args.age
        });

        // Saves author to mongoDB
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (_, args) => {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });

        // Saves book to mongoDB
        return book.save();
      }
    }
  }
});

/**
 * * Mutation example
 * * mutation { addAuthor(name: "Steve", age: 29){name age}}
 *
 */

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
