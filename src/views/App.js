import React from 'react';
import { useSelector } from 'react-redux';
import { PAGE } from "../redux/storeConstants";
import LoginPage from "../components/login/LoginPage";
import SignUpPage from "../components/login/SignUpPage";
import InvalidPage from "../components/InvalidPage";
import Game from "../components/game/Game";
import Lobby from "../components/lobby/Lobby";
import Header from "../components/Header";

const App = () => {
  const page = useSelector(state => state.user.page);

  const display = () => {
    switch(page) {
      case PAGE.SIGN_UP:
        return <SignUpPage />;
      case PAGE.LOBBY:
        return <Lobby />;
      case PAGE.GAME:
        return <Game />;
      case PAGE.INVALID:
        return <InvalidPage />;
      default:
      case PAGE.LOGIN:
        return <LoginPage />;
    }
  }

  return (
    <>
      <Header />
      {display()}
    </>
  );
};

export default App;
export const ALERT_MSG_TIME = 2000;
export const EMPTY = "";