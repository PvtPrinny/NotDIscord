import './Home.css'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import TextChannel from '../components/TextChannel';
import Channel from '../components/TextChannel';
import HashtagIcon from '../assets/text-channel-icon.png'
import {firebase, getFirestore, enableIndexedDbPersistence } from 'firebase/compat/app'; //v9

const Home = () => {


  const firebaseConfig = {
    // your config
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  
  // Enable offline persistence
  enableIndexedDbPersistence(firestore, {
    synchronizeTabs: true,
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
  });

  const navigate = useNavigate();

  const [loggedIn,setLoggedIn] = useState(null);
  const [comment,setComment] = useState("");
  const [textInput,setTextInput] = useState("");
  const [postLists,setPostList] = useState([]);

  // useEffect(() => { // checks whether any user is logged in
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     if(currentUser){
  //       setLoggedIn(true)
  //       // console.log("user " + currentUser.email + "logged in");
  //     }
  //     else{
  //       setLoggedIn(false)
  //       console.log("logged out");
  //       navigate("/"); // Redirect to login if user isn't already logged in;
  //     }
  //   });
  //   return() => unsubscribe();
  // }, [])

  useEffect(() => {
    console.log("useEffect triggered");
    const unsubscribe = onSnapshot(postsCollectionRef, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setPostList(fetchedPosts);
    });
    return () => unsubscribe();
  }, []);

  const postsCollectionRef = collection(db, "posts");

  const createComment = async () => {
    const currentDate = new Date();

    await addDoc(postsCollectionRef, {
      userName: auth.currentUser.email,
      comment: textInput,
      date: new Date().toUTCString(),
      // commentDate: {
      //   date: currentDate.getDate(),
      //   month: currentDate.getMonth(),
      //   year: currentDate.getFullYear(),
      //   hour: currentDate.getHours(),
      //   minute: currentDate.getMinutes(),
      // }
      
      // commentDate: firebase.firestore.Timestamp.fromDate(currentDate)
    })
      
  };

  const handlePost = () => {
    // console.log(e.target.value);
        // Handle posting logic here
        console.log(auth.currentUser.email + " comments: " + textInput);
        setComment(textInput);
        setTextInput(""); // Set comment to empty string after posting
  }
 
  useEffect(() => {

    console.log("useEffect triggered");
    const getPostCollection = async () => {
  
      try {
        const data = await getDocs(postsCollectionRef);
        const fetchedPosts = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setPostList(fetchedPosts);
      }catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    getPostCollection();
    console.log(postLists.comment)
  }, [comment]);

  /*
  useEffect(() => {
    // Log comments from Firebase
    console.log("Comments from Firebase:");
    postLists.forEach((posts) => {
      console.log(posts.comment);
    });
  }, [postLists]); // This useEffect will trigger whenever postLists changes*/
  
  return (

    <div className='home-main-div'>
      <div className='server-toggle'></div>
      <div className='server-div'>

        <div className='header-div'>
          <div className='server-header'>
            <h2 className='server-name'>Public Server</h2>
          </div>
          <div className='channel-header'></div>
        </div>

        <div className='content-div'>

          <div className='left-content-div'>
            <div className='channel-toggle'>
              <div className='channel'>
                <img src={HashtagIcon} className='hashtag' />
                Posts
              </div>
            </div>
            <div className='user-status'></div>
          </div>

          {/* <div className='channel-container'> */}
            {/* <div className='content-container'> */}
              <div className='middle-content-div'>
                <div className='post-area'>
                <TextChannel 
                  comments={postLists}
                />
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
                          createComment();
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
