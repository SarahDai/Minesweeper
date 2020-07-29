import React from 'react';
import {Provider} from "react-redux"; // Automatically passes the store to all child components
import store from "../redux/store"; // The store and main reducer
// import DisplayOnly from "../components/DisplayOnly";
// import UpdateOnly from "../components/UpdateOnly";
// import DisplayAndUpdate from "../components/DisplayAndUpdate";
import PageTitle from "../components/PageTitle";
import HrHeader from "../components/HrHeader";
import HrFooter from "../components/HrFooter";
import {Container} from 'reactstrap';


const App = () => 
  <Provider store={store}>
    <Container fluid>   
      <PageTitle/>
      <HrHeader/>
      <HrFooter/>
    </Container> 
  </Provider>

export default App;
