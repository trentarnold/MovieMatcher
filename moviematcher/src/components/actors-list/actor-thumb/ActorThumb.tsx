import React from 'react'
import './ActorList.css'
import { Cast } from '../../../../../interfaces/ActorList'
type Props = {
  actor:Cast
}
const ActorThumb:React.FC<Props> = ({actor}) => {
  return (
       <div className="actor-thumb">
          {actor.profile_path && 
          <div>
            <img className='actor-thumb-img' src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt='movie poster' /> 
              <div className='actor-thumb-img-background'>
                <p> {actor.name}</p>
              </div>  
          </div>}
          {!actor.profile_path && 
          <div className='actor-thumb-img-background-alt'>
          <p> {actor.name}</p>
        </div>  }
        </div> 
  )
}

export default ActorThumb
