import React from 'react'
import { useAppSelector } from '../../redux/app/hooks'
import { selectUserStreaming } from '../../redux/features/user/userStreaming'
import StreamItem from './streaming-item/StreamItem';
require('./StreamingServicesList.css');

const StreamingServiceList = () => {
  const userStreaming = useAppSelector(selectUserStreaming);
  const providers = [{
    display_priority: 1,
    logo_path: "/68MNrwlkpF7WnmNPXLah69CR5cb.jpg",
    provider_name: "Amazon Prime Video",
    provider_id: 119
},
{
    "display_priority": 0,
    "logo_path": "/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg",
    "provider_name": "Netflix",
    "provider_id": 8
  },
  {
    "display_priority": 1,
    "logo_path": "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
    "provider_name": "Disney Plus",
    "provider_id": 337
  },
  {
    "display_priority": 2,
    "logo_path": "/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg",
    "provider_name": "Apple iTunes",
    "provider_id": 2
  },
  {
    "display_priority": 7,
    "logo_path": "/aS2zvJWn9mwiCOeaaCkIh4wleZS.jpg",
    "provider_name": "HBO Max",
    "provider_id": 384
  },
  {
    "display_priority": 6,
    "logo_path": "/giwM8XX4V2AQb9vsoN7yti82tKK.jpg",
    "provider_name": "Hulu",
    "provider_id": 15
  },
]
  const sortedProviders = providers.sort((a, b):any => {
    return a.provider_name.localeCompare(b.provider_name);
  })

  return (
    <div className='streaming-list'>
      {sortedProviders.map(p => {
        if (userStreaming.includes(p.provider_id)) {
          return <StreamItem provider={p} userSaved={true} key={p.provider_id}/>
        }
      })}
      {sortedProviders.map(p => {
        if (!userStreaming.includes(p.provider_id)) {
          return <StreamItem provider={p} userSaved={false} key={p.provider_id}/>
        }
      })}
  
      {/* {providers.map(p => {
        return userStreaming.includes(p.provider_id) ? <StreamItem provider={p} userSaved={true} key={p.provider_id}/> : <StreamItem provider={p} userSaved={false} key={p.provider_id}/>
      })} */}
    </div>
  )
}

export default StreamingServiceList
