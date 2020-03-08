// *---------* Imports *---------*
import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

// *---------* Components *---------*
import Booklist from "./components/booklist";
import BookForm from "./components/bookForm";

// *---------* Apollo *---------*

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="name">
          <h1>Ninjas's reading list</h1>
          <Booklist />
          <BookForm />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
