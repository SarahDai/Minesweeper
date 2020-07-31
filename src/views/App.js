import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from "../redux/actions";
import { PAGE } from "../redux/storeConstants";
import LoginPage from "../components/LoginPage";
import SignUpPage from "../components/SignUpPage";
import InvalidPage from "../components/InvalidPage";
import ProjectBoard from "../components/ProjectBoard";

const App = () => {
  const page = useSelector(state => state.user.page);
  const dispatch = useDispatch();
   
  useEffect(() => {
    // dispatch(getUserList());
  }, [dispatch, page]);

  const getPage = () => {
    console.log(page);
    if (page === PAGE.LOGIN) {
      return <LoginPage/>;
    } else if (page === PAGE.SIGN_UP) {
      return <SignUpPage/>;
    } else if (page === PAGE.PROJECT_BOARD) {
      return <ProjectBoard/>
    } else {
      return <InvalidPage/>
    }
  };
  
  return (
    <Container fluid>  
    {getPage()}
    </Container>
  );
};

export default App;
export const ALERT_MSG_TIME = 2000;
export const EMPTY = "";