import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider, ApolloClient } from "@apollo/client";
//import ApolloClient from "apollo-boost";

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// pages
import Home from './pages/Home';
// import Item from './pages/Item';
 import Login from './pages/Login';
// import NoMatch from './pages/NoMatch';
 import Signup from './pages/Signup';
// import OrderHistory from './pages/OrderHistory';
// import Menu from './pages/Menu';
import Contact from './pages/Contact';
// import Success from './pages/Success';

const client = new ApolloClient({
  uri: "/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} /> 
              <Route exact path="/signup" component={Signup} />
              {/* {/* <Route exact path="/orderhistory" component={OrderHistory} />
              <Route exact path="/menu" component={Menu} />
              <Route exact path="/item" component={Item} /> */}
              <Route exact path="/contact" component={Contact} />
              {/* <Route exact path="/success" component={Success} />  */}
              {/* if the route doesn't match any of the other path's, get a 404 */}
              {/* <Route component={NoMatch} /> */}
            </Switch>
          </div>
          <Footer /> 
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
