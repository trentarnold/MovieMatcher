import {useEffect, useState} from 'react';
import APIService from '../../../services/APISevice';
import { useParams } from 'react-router';
import ActorDetailsInterface from '../../../../../interfaces/ActorDetails';
import { actorDetailsPlaceholder } from '../../../actorDetailsPlaceholder';
import './ActorDetails.css'

const ActorDetails = () => {
  const { id } : any = useParams();
  const [currentActor, setCurrentActor] = useState<ActorDetailsInterface>(actorDetailsPlaceholder);

  useEffect(() => {
    let isCancelled = false;
    async function fetchMovie () {
      try{
        const actorDetails = await APIService.getActorDetails(id);
        if(!isCancelled) {
          setCurrentActor(actorDetails);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchMovie();

    return () => {
        isCancelled = true
    };

  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
  <div>
    <div className='movie-details-container center'>
      <div className='movie-details-information-container'>
        <div className ='movie-details-title-container center'>
          <div className='movie-details-title'>{currentActor.name}</div>            
        </div>
        <div>Born on {currentActor.birthday} at {currentActor.place_of_birth}</div>
        <div className='movie-details-description'>{currentActor.biography}</div>
      </div>
      <div>
        <img className='movie-details-image' src={`https://image.tmdb.org/t/p/w500${currentActor.profile_path}`} alt="movie poster"/>
      </div>
    </div>
  </div>
  )
}

export default ActorDetails;
