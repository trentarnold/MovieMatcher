import React, {useEffect, useState} from 'react'
import { useAppSelector } from '../../redux/app/hooks'
import { selectUserStreaming } from '../../redux/features/user/userStreaming'
import StreamItem from './streaming-item/StreamItem';
import {IStreamProvider} from '../../../../interfaces/StreamProviders';
import APIService from '../../services/APISevice';
require('./StreamingServicesList.css');

const StreamingServiceList = () => {
  const userStreaming = useAppSelector(selectUserStreaming);
  const [providers, setProviders] = useState<IStreamProvider[]>([]);

  useEffect(() => {
    async function getProviders() {
      const res = await APIService.getAllStreamProviders()
      const cleanNames: string[] = [];
      const cleanArr: IStreamProvider[] = [];
      res.map(p => {
        if (!cleanNames.includes(p.provider_name)) {
          cleanNames.push(p.provider_name)
          cleanArr.push(p)
        }
      }) 
      setProviders(cleanArr);
    }
    getProviders()
  }, [])

  
  const sortedProviders = providers.sort((a, b):any => {
    return a.provider_name.localeCompare(b.provider_name);
  })

  return (
    <div className='streaming-list' style={{flexWrap: 'wrap', justifyContent: "center"}}>
      {sortedProviders.map((p:IStreamProvider) => {
        if (userStreaming.includes(p.provider_id)) {
          return <StreamItem provider={p} userSaved={true} key={p.provider_id}/>
        }
      })}
      <div style={{width: "90%", borderBottom: "2px solid grey"}}/>
      {sortedProviders.map((p:IStreamProvider) => {
        if (!userStreaming.includes(p.provider_id)) {
          return <StreamItem provider={p} userSaved={false} key={p.provider_id}/>
        }
      })}
    </div>
  )
}

export default StreamingServiceList
