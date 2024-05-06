import { useState, useEffect } from 'react'

const Channel = ( {channelName}) => {
    
  return (
    <div>
      {channelName.map((channelName,index) => (
        <div key={index} className='text-channel-name'>
            <p>{channelName.id}</p>
        </div>
      ))}
    </div>
  )
}

export default Channel
