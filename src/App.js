import './App.css';
import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import Auth from './components/Login.js';
import Home from './pages/Home.js'


function App() {

  const [loggedIn,setLoggedIn] = useState(null);

    useEffect(() => { // checks whether any user is logged in
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if(currentUser){
            setLoggedIn(true)
            console.log("logged in");
          }
          else{
            setLoggedIn(false)
            console.log("logged out");
          }
      });
      return() => unsubscribe();
  }, [])

  return (

    <div className="App">
        <HashRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            {/* <Route
              path="*"
              element={
              loggedIn ? <Navigate to="/home" /> : <Navigate to="/auth" />
            }
            /> */}
          </Routes>
        </HashRouter>
    </div>
  );
}

export default App;
//npm install react-router-dom
//npm install firebase
//npm install -g firebase-tools
//npm install gh-pages --save-dev