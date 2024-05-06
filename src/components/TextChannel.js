import React from 'react'
import './TextChannel.css'
import Placeholder from '../assets/PrinnyProfilePic.png'

const TextChannel = ( {comments} ) => {

  const sortedComments = comments.sort((a, b) => new Date(a.date) - new Date(b.date));

  const dateConvert = (dateString) => {
    const currentDate = new Date();
    const commentDate = new Date(dateString); // Convert UTC string to JavaScript Date object
    
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  
    if (
      currentDate.getDate() === commentDate.getDate() &&
      currentDate.getMonth() === commentDate.getMonth() &&
      currentDate.getFullYear() === commentDate.getFullYear()
    ) {
      // It's today
      return 'Today at ' + commentDate.toLocaleTimeString(undefined, options);
    } else if (
      currentDate.getDate() - 1 === commentDate.getDate() &&
      currentDate.getMonth() === commentDate.getMonth() &&
      currentDate.getFullYear() === commentDate.getFullYear()
    ) {
      // It's yesterday
      return 'Yesterday at ' + commentDate.toLocaleTimeString(undefined, options);
    } else {
      // Otherwise, return the formatted date
      return commentDate.toLocaleDateString(undefined, options);
    }
  };

  return (
    <div>
      {sortedComments.map((comment,index) => (
        <div key={index} className='comments-div'>
        <div>
          <img src={Placeholder} className='profile-pic'/>
        </div>
        <div>
          <p style={{color: 'white'}} className='userName'>{comment.userName}</p>
          <p style={{color: 'white'}} className='userComment'>{comment.comment}</p>
        </div>
        <div className='date'>
          {dateConvert(comment.date)}
        </div>
        </div>
      ))}
    </div>
  )
}

export default TextChannel
