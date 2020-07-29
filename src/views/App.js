import React from 'react';
import { Provider } from "react-redux"; // Automatically passes the store to all child components
import { Container } from 'reactstrap';
import store from "../redux/store";
import AccountPage from "../components/AccountPage";

const App = () => 
  <Provider store={store}>
    <Container fluid>   
      <AccountPage/>
    </Container> 
  </Provider>

export default App;
