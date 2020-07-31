import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyAItQWqUPCI47I9uoF9t4AjQ3BTyohLkUk",
   authDomain: "final-project-c335d.firebaseapp.com",
   databaseURL: "https://final-project-c335d.firebaseio.com",
   projectId: "final-project-c335d",
   storageBucket: "final-project-c335d.appspot.com",
   messagingSenderId: "497781284991",
   appId: "1:497781284991:web:802ac0c6ef5e64140c1f4a",
   measurementId: "G-BK2GDML896"
}

firebase.initializeApp(firebaseConfig);

export default firebase;