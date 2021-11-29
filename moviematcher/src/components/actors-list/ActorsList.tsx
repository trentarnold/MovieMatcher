import './actorsList.css'
import React, {useState, useEffect} from 'react'
import  APIService  from '../../services/APISevice'
import ActorThumb from './actor-thumb/ActorThumb'
import {ActorListInterface} from '../../../../interfaces/ActorList'
import { actorListPlaceholder } from '../../actorListPlaceholder'
import {Crew, Cast} from '../../../../interfaces/ActorList'

type Props = {
  id:number
}

const castArray:Cast[] =[];

const ActorsList:React.FC<Props>  = ({id}) => {
  const [actorList, setActorList] = useState<Cast[]>(castArray)
  useEffect(() => {
      async function fetchMovie () {
          setActorList(castArray)
          const actorListIDS = await APIService.getActorList(id);
          const filteredActorList = actorListIDS.cast.filter((actor, index, self) =>
            index === self.findIndex((selfActor) => selfActor.id === actor.id)
          );
          setActorList(filteredActorList);
      }
      fetchMovie()
  }, [id])
  return (
    <div className="actor-list-container">
        <h1>Cast</h1>
        {console.log(actorList)}
        <div className="movie-list">
            {actorList.map((actor:any) => <ActorThumb key={Number(actor.id)} actor={actor} role={actor.character}/>)}
        </div>
    </div>
  )
}

export default ActorsList
