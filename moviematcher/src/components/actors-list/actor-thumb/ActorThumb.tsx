import React from 'react'
import './ActorList.css'
import { Cast } from '../../../../../interfaces/ActorList'
type Props = {
  actor:Cast,
  role:string
}
const ActorThumb:React.FC<Props> = ({actor, role}) => {
  return (
       <div className="actor-thumb">
          {actor.profile_path && 
          <div>
            <img className='actor-thumb-img' src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt='movie poster' /> 
              <div className='actor-thumb-img-background'>
                <p> {actor.name}</p>
                {role && 
                <>
                  <p>as</p>
                  <p>{role}</p>
                </>}
              </div>  
          </div>}
          {!actor.profile_path && 
          <div className='actor-thumb-img-background-alt'>
            <p> {actor.name}</p>
            {role &&
            <> 
              <p>as</p>
              <p>{role}</p>
            </>}
          </div>}
        </div> 
  )
}

export default ActorThumb
