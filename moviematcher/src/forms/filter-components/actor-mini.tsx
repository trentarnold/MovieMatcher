import './actor-mini.css'

interface Props {
  actorName:string;
  actorId: number;
  onClickFunc: (actorId:number, actorName:string) => void
}

const ActorMini:React.FC<Props> = ({actorName, actorId, onClickFunc}) => {

  return (
    <div className="actor-mini">
      <p>{actorName}</p>
      <a onClick={() => onClickFunc(actorId, actorName)}>X</a>
    </div>
  )
}

export default ActorMini