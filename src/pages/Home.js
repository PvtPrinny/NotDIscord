import './Home.css'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from "../config/firebase";
import Channel from '../components/TextChannel';

const Home = () => {

  const navigate = useNavigate();

  const [loggedIn,setLoggedIn] = useState(null);
  const [comment,setComment] = useState("");
  const [textInput,setTextInput] = useState("");
  const [userName,setUserName] = useState("");

  useEffect(() => { // checks whether any user is logged in
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser){
        setLoggedIn(true)
        console.log("user " + currentUser.email + "logged in");
        setUserName(currentUser.email);
      }
      else{
        setLoggedIn(false)
        console.log("logged out");
        navigate("/"); // Redirect to login if user isn't already logged in;
      }
    });
    return() => unsubscribe();
  }, [])

  const handlePost = () => {
    // console.log(e.target.value);
        // Handle posting logic here
        console.log(userName + " comments: " + textInput);
        setComment(textInput);
        setTextInput(""); // Set comment to empty string after posting
  }
 
  return (

    <div className='home-main-div'>
      <div className='server-toggle'></div>
      <div className='server-div'>

        <div className='header-div'>
          <div className='server-header'></div>
          <div className='channel-header'></div>
        </div>

        <div className='content-div'>

          <div className='left-content-div'>
            <div className='channel-toggle'>
              <Channel />

            </div>
            <div className='user-status'></div>
          </div>

          {/* <div className='channel-container'> */}
            {/* <div className='content-container'> */}
              <div className='middle-content-div'>
                <div className='post-area'>
                  
                </div>
                <input
                    type='text'
                    id='comment'
                    className='comment'
                    placeholder="What's on your mind?"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                          handlePost();
                      }
                  }}
                />
              </div>
            <div className='right-content-div'>
              <div className='user-area'></div>
            </div>
            {/* </div> content container end */}
          {/* </div> */}

        </div>
      </div>
    </div>
  )
}

export default Home
