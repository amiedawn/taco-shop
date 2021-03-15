import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from "@apollo/client";
import ApolloClient from "apollo-boost";

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { StoreProvider } from './utils/GlobalState';

// pages
import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Signup from './pages/Signup';
import OrderHistory from './pages/OrderHistory';
//import Menu from './pages/Menu';
// import Contact from './pages/Contact';
// import Success from './pages/Success';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <div className="container">
            {/* all components belong inside the StoreProvider tags */}
            <StoreProvider>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/orderhistory" component={OrderHistory} />
                {/* <Route exact path="/menu" component={Menu} /> */}
                <Route exact path="/detail" component={Detail} />
                {/* <Route exact path="/contact" component={Contact} />
                <Route exact path="/success" component={Success} /> */}
                {/* if the route doesn't match any of the other path's, get a 404 */}
                <Route component={NoMatch} />
              </Switch>
              <Footer />
            </StoreProvider>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
