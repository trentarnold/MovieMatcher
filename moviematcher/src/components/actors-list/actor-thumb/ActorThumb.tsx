import React from 'react'
import './ActorList.css'
import { ICast } from '../../../../../interfaces/ActorList'
import {Button} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

type Props = {
  actor:ICast,
  role:string
}

const ActorThumb:React.FC<Props> = ({actor, role}) => {
  const navigate = useNavigate();

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
            <Button style={{backgroundColor:'transparent'}}
              className='btn hidden-background enlarge-on-hover'
              onClick={() => {
               navigate(`/actorDetails/${actor.id}`)
              }}>
              More Details
            </Button>
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
  );
};

export default ActorThumb;
