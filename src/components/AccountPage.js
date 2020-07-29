import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";


const AccountPage = () => {
   const [showLogin, setShowLogin] = useState(true);


   return (
      showLogin ?
      <LoginPage showSignUp={()=>setShowLogin(false)}/>
      :
      <SignUpPage showLogin={()=>setShowLogin(true)}/>
   );
}

export default AccountPage;