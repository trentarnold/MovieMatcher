import './actorsList.css'
import React, {useState, useEffect} from 'react'
import  APIService  from '../../services/APISevice'
import ActorThumb from './actor-thumb/ActorThumb'
import {ActorListInterface} from '../../../../interfaces/ActorList'
import { actorListPlaceholder } from '../../actorListPlaceholder'
type Props = {
  id:number
}
const ActorsList:React.FC<Props>  = ({id}) => {
  const [actorList, setActorList] = useState<ActorListInterface>(actorListPlaceholder)
  useEffect(() => {
      async function fetchMovie () {
          const actorListIDS = await APIService.getActorList(id);
          setActorList(actorListIDS);
      }
      fetchMovie()
  }, [id])
  return (
    <div className="actor-list-container">
        <h1>Cast</h1>
        {console.log(actorList)}
        <div className="movie-list">
            {actorList.cast.map((actor:any) => <ActorThumb key={Number(actor.id)} actor={actor}/>)}
        </div>
    </div>
  )
}

export default ActorsList
