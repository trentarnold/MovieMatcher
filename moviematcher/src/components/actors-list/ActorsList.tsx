import './actorsList.css'
import React, {useState, useEffect} from 'react'
import  APIService  from '../../services/APISevice'
import ActorThumb from './actor-thumb/ActorThumb'
import {Cast} from '../../../../interfaces/ActorList'
import {useAppSelector} from '../../redux/app/hooks'
type Props = {
  id:number
}

const castArray:Cast[] =[];

const ActorsList:React.FC<Props>  = ({id}) => {
  const [actorList, setActorList] = useState<Cast[]>(castArray)
  const toggle = useAppSelector((state) => state.friendsList.value)

  useEffect(() => {
    let isCancelled = false;
      async function fetchMovie () {
          setActorList(castArray)
          const actorListIDS = await APIService.getActorList(id);
          const filteredActorList = actorListIDS.cast.filter((actor, index, self) =>
            index === self.findIndex((selfActor) => selfActor.id === actor.id)
          );
          if(!isCancelled) {
          setActorList(filteredActorList);
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
  
        <div className="movie-list" style={{maxWidth: toggle? '83.5%' : '100%'}}>
            {actorList.map((actor:any) => <ActorThumb key={Number(actor.id)} actor={actor} role={actor.character}/>)}
        </div>
    </div>
  )
}

export default ActorsList
