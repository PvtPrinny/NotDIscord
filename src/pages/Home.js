import './Home.css'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from "../config/firebase";

const Home = () => {

  const navigate = useNavigate();
  
  const [loggedIn,setLoggedIn] = useState(null);
  const [comment,setComment] = useState("");

  useEffect(() => { // checks whether any user is logged in
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser){
        setLoggedIn(true)
        console.log("user " + currentUser.email + "logged in");
        navigate("/home"); // Redirect to homepage if user is already logged in;
      }
      else{
        setLoggedIn(false)
        console.log("logged out");
        <Navigate to="/home" />
      }
    });
    return() => unsubscribe();
  }, [])

  

  return (
    <div className='home-main-div'>
      <div className='server-toggle'></div>
      <div className='content-div'>
        <div className='left-content-div'>
          <div className='server-header'></div>
          <div className='channel-toggle'></div>
          <div className='user-status'></div>
        </div>
        <div className='channel-container'>
          <div className='channel-header'>
          </div>
          <div className='content-container'>
            <div className='middle-content-div'>
              <div className='post-area'>
                
              </div>
              <input
                  type='text'
                  id='comment'
                  className='comment'
                  placeholder="What's on your mind?"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
              />
            </div>
            <div className='user-area'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
