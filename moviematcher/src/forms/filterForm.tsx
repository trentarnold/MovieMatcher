import {
    Modal,
    DarkMode,
    ModalOverlay,
    ModalBody,
    FormControl,
    Switch,
    FormLabel,
    Flex,
    Input,
    ModalContent,
    Text,
    RadioGroup,
    Radio,
    Stack,
    Button,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks';
import { useAppSelector, useAppDispatch } from '../redux/app/hooks';
import { selectMovieFilter, turnOffMovieFilter } from '../redux/features/modals/movieFilterSlice';
import { socket } from '../socket';
import { useEffect, useState } from 'react'
import './filterForm.css'
import { clearRoomName, selectRoomName } from '../redux/features/modals/roomNameSlice';
import { selectUserName } from '../redux/features/user/yourUserName';
import {filterObject, filterData, ActorResult} from '../../../interfaces/filterFormInterface';


const streamProviders = [{
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

const FilterForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const room = useAppSelector(selectRoomName);
    const open = useAppSelector(selectMovieFilter)
    const loggedInUser = useAppSelector(selectUserName)
    const dispatch = useAppDispatch()

    //lmfao
    const [action, setAction] = useState<string>('na')
    const [adventure, setAdventure] = useState<string>('na')
    const [animation, setAnimation] = useState<string>('na')
    const [comedy, setComedy] = useState<string>('na')
    const [crime, setCrime] = useState<string>('na')
    const [documentary, setDocumentary] = useState<string>('na')
    const [drama, setDrama] = useState<string>('na')
    const [family, setFamily] = useState<string>('na')
    const [fantasy, setFantasy] = useState<string>('na')
    const [history, setHistory] = useState<string>('na')
    const [horror, setHorror] = useState<string>('na')
    const [music, setMusic] = useState<string>('na')
    const [mystery, setMystery] = useState<string>('na')
    const [romance, setRomance] = useState<string>('na')
    const [sciFi, setSciFi] = useState<string>('na')
    const [thriller, setThriller] = useState<string>('na')
    const [war, setWar] = useState<string>('na')
    const [western, setWestern] = useState<string>('na')
    const [filters, setFilters] = useState<filterData[]>([])

    const [otherUserFilters, setOtherUserFilter] = useState<filterData>()

    const [genres, setGenres] = useState<string[]>([]);
    const [avoidGenres, setAvoidGenres] = useState<string[]>([]);
    const [cast, setCast] = useState<string[]>([]);
    const [castIds, setCastIds] = useState<number[]>([]);
    const [providers, setProviders] = useState<string[]>([]);
    const [query, setQuery] = useState<string>('')
    const [queryResults, setQueryResults] = useState<ActorResult[]>([])
    const handleClose = () => {
        dispatch(turnOffMovieFilter())
        onClose();
    }

    const handleSubmit = () => {
      const filterObject = {providers, genres, avoidGenres, cast}
      const username = loggedInUser
      if(!otherUserFilters){
        socket.emit('addFilter', room, username, filterObject)
        handleClose()
      }
      if(otherUserFilters){
        const userFiltersData = {
          username,
          filter: filterObject
        }
        socket.emit('sendBothFilters', room, userFiltersData, otherUserFilters)
        handleClose()
      }

    }

    const handleAddToggle = (genreId: string) => {
      if(genres.indexOf(genreId) === -1) {
        setGenres([...genres, genreId]);
      }
      if(avoidGenres.indexOf(genreId) !== -1) {
        setAvoidGenres(avoidGenres.filter(genre => genre !== genreId));
      }
    }

    const handleRemoveToggle = (genreId: string) => {
      if(genres.indexOf(genreId) !== -1) {
        setGenres(genres.filter(genre => genre !== genreId));
      }
      if(avoidGenres.indexOf(genreId) === -1) {
        setAvoidGenres([...avoidGenres, genreId]);
      }  
    }

    const handleNeutralToggle = (genreId: string) => {
      if(genres.indexOf(genreId) !== -1) {
        setGenres(genres.filter(genre => genre !== genreId));
      }
      if(avoidGenres.indexOf(genreId) !== -1) {
        setAvoidGenres(avoidGenres.filter(genre => genre !== genreId));
      }
    }

    const handleStreamingSwitch = (providerId:string) => {
      if(providers.indexOf(providerId) === -1) {
        setProviders([...providers, providerId]);
      } else {
        setProviders(providers.filter(provider => provider !== providerId));
      }
    };
    const handleChange = (value:string, callBackString:string, id: string, sent:boolean) => {
      const setState = eval(callBackString);
      setState(value);
      if (value === '+') {
        handleAddToggle(id);
        if (!sent) {
          socket.emit('handleAddToggle', value, callBackString, id, room);
        }
      } else if (value === '-') {
        handleRemoveToggle(id);
        if(!sent) {
          socket.emit('handleRemoveToggle', value, callBackString, id, room);
        }
      } else {
        handleNeutralToggle(id);
        if(!sent) {
          socket.emit('handleResetToggle', value, callBackString, id, room);
        }
      }
    }
    // socket.on('handleRemoveToggle', (value, callBackString, id, room) => {
    //   socket.to(room).emit('handleRemoveToggle', value, callBackString, id);
    // })
    // socket.on('handleResetToggle', (value, callBackString, id, room) => {
    //   socket.to(room).emit('handleResetToggle', value, callBackString, id);
    // })

    const handleQueryChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.currentTarget.value);
    }

    const handleActorSubmit = (query:string) => {
      setCast([...cast, query]);
      setQuery('');
    }

    const handleActorClick = (id:number, name: string) => {
      handleActorSubmit(name);
      setCastIds([...castIds, id]);
    }

    useEffect(() => {
      if(open) {
        onOpen();
        setFilters([]);
      }
    }, [open])
    // useEffect(() => {
    //   console.log(genres);
    // }, genres)
    useEffect (()=>{
      console.log(otherUserFilters)
      },[otherUserFilters])

      useEffect(() => {
                socket.on('sendFilter', (username:string, filter:filterObject) => {
                  console.log('getting filter')
                  console.log(filter)
                  if(username != loggedInUser) {
                    setOtherUserFilter({username, filter})
                  }
                })
                socket.on('handleAddToggle', (value, callBackString, id) => {
                  console.log(id, 'handleAddToggle')
                  handleChange(value, callBackString, id, true);
                })
                socket.on('handleResetToggle', (value, callBackString, id) => {
                  console.log(id, 'handleAddToggle')
                  handleChange(value, callBackString, id, true);
                })
                socket.on('handleRemoveToggle', (value, callBackString, id) => {
                  console.log(id, 'handleAddToggle')
                  handleChange(value, callBackString, id, true);
                })
              }, []);

    useEffect(() =>{
      async function searchActors () {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/search/person?api_key=66be68e2d9a8be7fee88a803b45d654b&language=en-US&query=${query}&page=1&include_adult=false`)
          const res = await response.json()
          setQueryResults(res.results)
        } catch (e) {
          console.log(e)
        }
      }
      
      if (query.length > 1) {
        //replace this with function from api service
        searchActors()
      }
    }, [query])
    

    return (
      <DarkMode>
        <Modal isOpen={isOpen}  onClose={() => {}} isCentered>
          <ModalOverlay/>
          <ModalContent style={{borderRadius:'2rem', color:'white'}}>
            <ModalBody>
                <FormControl display='flex' justifyContent="space-between" flexDirection='column'>
                  <Text textAlign="center"> Select Genres</Text>

                  <Flex  justifyContent="center"> {/* lmfao */}
                    {/* maybe map these from an array instead. It'd be harder to control the styling for it */}
                    <Flex flexDirection="column" tm='0' alignItems="center">
            
                      <FormLabel htmlFor='action' size='sm' mb='0'>
                          Action
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setAction', '28', false)
                      }} value={action} id="action">
                        <Stack direction='row'>
                          <Radio size='sm'  colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>

                      <FormLabel htmlFor='adventure' size='sm' mb='0'>
                          Adventure
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setAdventure', '12', false)
                      }} value={adventure} id="adventure">
                        <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      
                      <FormLabel htmlFor='animation' size='sm' mb='0'>
                          Animation
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setAnimation', '16', false)
                      }} value={animation} id="animation">
                        <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      
                      <FormLabel htmlFor='comedy' size='sm' mb='0'>
                          Comedy
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setComedy', '35', false)
                      }} value={comedy} id="comedy">
                      <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      <FormLabel htmlFor='crime' size='sm' mb='0'>
                          Crime
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setCrime', '80', false)
                      }} value={crime} id="crime">
                        <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      
                      <FormLabel htmlFor='documentary' size='sm' mb='0'>
                          Documentary
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setDocumentary', '99', false)
                      }} value={documentary} id="documentary">
                        <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      
                    </Flex>

                    <Flex flexDirection="column" alignItems="center">
                      <FormLabel htmlFor='drama' size='sm' mb='0'>
                          Drama
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setDrama', '18', false)
                      }} value={drama} id="drama">
                        <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      
                      <FormLabel htmlFor='family' size='sm' mb='0'>
                          Family
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setFamily', '10751', false)
                      }} value={family} id="family">
                        <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      
                      <FormLabel htmlFor='fantasy' size='sm' mb='0'>
                          Fantasy
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setFantasy', '14', false)
                      }} value={fantasy} id="fantasy">
                        <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      
                      <FormLabel htmlFor='history' size='sm' mb='0'>
                          History
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setHistory', '36', false)
                      }} value={history} id="history">
                        <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      
                      <FormLabel htmlFor='horror' size='sm' mb='0'>
                          Horror
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setHorror', '27', false)
                      }} value={horror} id="horror">
                        <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      
                      <FormLabel htmlFor='music' size='sm' mb='0'>
                          Music
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setMusic', '10402', false)
                      }} value={music} id="music">
                        <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      
                    </Flex>
                     
                    <Flex flexDirection="column" alignItems="center">
                      <FormLabel htmlFor='mystery' size='sm' mb='0'>
                          Mystery
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setMystery', '9648', false)
                      }} value={mystery} id="mystery">
                        <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      
                      <FormLabel htmlFor='romance' size='sm' mb='0'>
                          Romance
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setRomance', '10749', false)
                      }} value={romance} id="romance">
                        <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      
                      <FormLabel htmlFor='sciFi' size='sm' mb='0'>
                          Sci-Fi
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setSciFi', '878', false)
                      }} value={sciFi} id="sciFi">
                        <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      
                      <FormLabel htmlFor='thriller' size='sm' mb='0'>
                          Thriller
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setThriller', '53', false)
                      }} value={thriller} id="thriller">
                        <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      
                      <FormLabel htmlFor='war' size='sm' mb='0'>
                          War
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setWar', '10752', false)
                      }} value={war} id="war">
                        <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      <>
                      <FormLabel htmlFor='western' size='sm' mb='0'>
                          Western
                      </FormLabel>
                      <RadioGroup onChange={(value)=> {
                        handleChange(value, 'setWestern', '37', false)
                      }} value={western} id="western">
                        <Stack direction='row'>
                          <Radio size='sm' colorScheme='red' value='-'></Radio>
                          <Radio size='sm' value='na'defaultChecked={true}></Radio>
                          <Radio size='sm' colorScheme='green' value='+'></Radio>
                        </Stack>
                      </RadioGroup>
                      </>
                    </Flex>
                    
                </Flex>{/* rows of genre toggles*/}

                <Flex flexDirection="column" justifyContent="center">
                  <FormLabel htmlFor='actor' textAlign="center" mb="2px" mt="10px">
                   Include Actor
                  </FormLabel>
                  {cast.length > 0 && cast.map(actor=> <p>{actor}</p>) }
                  <Input type="text" id='actor' width="350px" value={query} onChange={handleQueryChange} margin="auto"/>
                  {/* add actor to a list in the component that renders actor cards for each item */}
                  {query.length > 2 &&
                  <div className='filter-search-results'>
                    {queryResults.map(actor => <p onClick={()=> handleActorClick(actor.id, actor.name)} key={actor.id}>{actor.name}</p>)}
                  </div>
                  }
                </Flex>

                <Flex flexDirection="column" mt="10px">
                  <FormLabel htmlFor='stream' textAlign="center">
                   Stream Providers
                  </FormLabel>
                  <div className='movie-details-stream-providers'>
                    {/* conditionally render / map stream providers for both users */}
                        {streamProviders && streamProviders.map((provider:any) => {
                            return(
                                <div key={provider.provider_id} style={{display: 'flex', flexDirection:"column", justifyContent: "center" }}>
                                <img className = 'movie-details-stream-provider' src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`} alt={provider.provider_name}/>
                                <Switch onChange={() => handleStreamingSwitch(provider.provider_id)} id={provider.provider_name} />
                                </div>
                            ) 
                            })
                        }
                    </div>
                </Flex>
                <Flex justifyContent='space-between' margin="10px">
                  <Button onClick={handleSubmit} >Apply Filters</Button>
                </Flex>
              </FormControl>
          </ModalBody>
          </ModalContent>
        </Modal>
      </DarkMode>
    )
}

export default FilterForm
