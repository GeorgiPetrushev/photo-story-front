import React from 'react';
import { urlFor } from '../client';

const LoopPin = ({pin:{image , postedBy, _id, destination}}) => {
  return (
    <div><img src={urlFor(image).width(250).url()} className='rounded-lg w-full' alt='user'></img></div>
  )
}

export default LoopPin