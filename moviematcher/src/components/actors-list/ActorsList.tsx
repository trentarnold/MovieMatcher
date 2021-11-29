import './actorsList.css'
import React, {useState, useEffect} from 'react'
import  APIService  from '../../services/APISevice'
import ActorThumb from './actor-thumb/ActorThumb'
import {ActorListInterface} from '../../../../interfaces/ActorList'
import { actorListPlaceholder } from '../../actorListPlaceholder'
import { useAppSelector } from '../../redux/app/hooks'
type Props = {
  id:number
}
const ActorsList:React.FC<Props>  = ({id}) => {
  const [actorList, setActorList] = useState<ActorListInterface>(actorListPlaceholder)
  const toggle = useAppSelector((state) => state.friendsList.value)
  useEffect(() => {
    let isCancelled = false;
      async function fetchMovie () {
          const actorListIDS = await APIService.getActorList(id);
          if(!isCancelled){
            setActorList(actorListIDS);
          }
      }
      fetchMovie()
      return () => {
        isCancelled = true;
      }
  }, [id])
  return (
    <div className="actor-list-container">
        <h1>Cast</h1>
        {/* pass individual movie to MovieThumb */}
        <div className="movie-list" style={{maxWidth: toggle? '83.5%' : '100%'}} >
            {actorList.cast.map((actor:any) => <ActorThumb key={Number(actor.id)} actor={actor}/>)}
        </div>
    </div>
  )
}

export default ActorsList
