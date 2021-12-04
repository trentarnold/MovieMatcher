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
import { selectSocketRef } from '../redux/features/socket/socketRefSlice';
import { useEffect, useState } from 'react'
import ActorDetailsInterface from '../../../interfaces/ActorDetails'

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
    const open = useAppSelector(selectMovieFilter)
    const socket = useAppSelector(selectSocketRef)
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

    const [genres, setGenres] = useState<string[]>([]);
    const [avoidGenres, setAvoidGenres] = useState<string[]>([]);
    const [cast, setCast] = useState<ActorDetailsInterface[]>([]);
    const [providers, setProviders] = useState<string[]>([]);


    const handleClose = () => {
        dispatch(turnOffMovieFilter())
        onClose();
    }

    const handleSubmit = () => {
      console.log(providers)
      console.log(genres)
      console.log(avoidGenres)
    }

    const handleAddToggle = (genreId: string) => {
      if(genres.indexOf(genreId) === -1) {
        setGenres([...genres, genreId])
      }
      if(avoidGenres.indexOf(genreId) !== -1) {
        setAvoidGenres(avoidGenres.filter(genre => genre !== genreId))
      }
    }

    const handleRemoveToggle = (genreId: string) => {
      if(genres.indexOf(genreId) !== -1) {
        setGenres(genres.filter(genre => genre !== genreId))
      }
      if(avoidGenres.indexOf(genreId) === -1) {
        setAvoidGenres([...avoidGenres, genreId])
      }  
    }

    const handleNeutralToggle = (genreId: string) => {
      if(genres.indexOf(genreId) !== -1) {
        setGenres(genres.filter(genre => genre !== genreId))
      }
      if(avoidGenres.indexOf(genreId) !== -1) {
        setAvoidGenres(avoidGenres.filter(genre => genre !== genreId))
      }
    }

    const handleStreamingSwitch = (providerId:string) => {
      if(providers.indexOf(providerId) === -1) {
        setProviders([...providers, providerId])
      } else {
        setProviders(providers.filter(provider => provider !== providerId))
      }
    };

    const handleChange = (value:string, callBackString:string, id: string) => {
      const setState = eval(callBackString)
      setState(value)
      if (value === '+') {
        handleAddToggle(id)
      } else if (value === '-') {
        handleRemoveToggle(id)
      } else {
        handleNeutralToggle(id)
      }
    }

    useEffect(() => {
        if(open) {
            onOpen()
        }
    }, [open])

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
                        handleChange(value, 'setAction', '28')
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
                        handleChange(value, 'setAdventure', '12')
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
                        handleChange(value, 'setAnimation', '16')
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
                        handleChange(value, 'setComedy', '35')
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
                        handleChange(value, 'setCrime', '80')
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
                        handleChange(value, 'setDocumentary', '99')
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
                        handleChange(value, 'setDrama', '18')
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
                        handleChange(value, 'setFamily', '10751')
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
                        handleChange(value, 'setFantasy', '14')
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
                        handleChange(value, 'setHistory', '36')
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
                        handleChange(value, 'setHorror', '27')
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
                        handleChange(value, 'setMusic', '10402')
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
                        handleChange(value, 'setMystery', '9648')
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
                        handleChange(value, 'setRomance', '10749')
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
                        handleChange(value, 'setSciFi', '878')
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
                        handleChange(value, 'setThriller', '53')
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
                        handleChange(value, 'setWar', '10752')
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
                        handleChange(value, 'setWestern', '37')
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
                  <Input type="text" id='actor' width="350px" margin="auto"/>
                  {/* add actor to a list in the component that renders actor cards for each item */}
                </Flex>

                <Flex flexDirection="column" mt="10px">
                  <FormLabel htmlFor='stream' textAlign="center">
                   Stream Providers
                  </FormLabel>
                  <div className='movie-details-stream-providers'>
                        {streamProviders && streamProviders.map((provider:any) => {
                            return(
                                <div style={{display: 'flex', flexDirection:"column", justifyContent: "center" }}>
                                <img className = 'movie-details-stream-provider' src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`} alt={provider.provider_name}/>
                                <Switch onChange={() => handleStreamingSwitch(provider.provider_id)} id={provider.provider_name} />
                                </div>
                            ) 
                            })
                        }
                    </div>
                  {/* conditionally render / map stream providers for both users */}
                </Flex>
                <Flex justifyContent='space-between' margin="10px">
                  <Button onClick={handleSubmit}>Apply Filters</Button>
                </Flex>
              </FormControl>
          </ModalBody>
          </ModalContent>
        </Modal>
      </DarkMode>
    )
}

export default FilterForm
