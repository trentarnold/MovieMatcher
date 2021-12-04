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
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks';
import { useAppSelector, useAppDispatch } from '../redux/app/hooks';
import { selectMovieFilter, turnOffMovieFilter } from '../redux/features/modals/movieFilterSlice';
import { selectSocketRef } from '../redux/features/socket/socketRefSlice';
import { useEffect } from 'react'


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

    const handleClose = () => {
        dispatch(turnOffMovieFilter())
        onClose();
    }

    useEffect(() => {
        if(open) {
            onOpen()
        }
    }, [open])

    return (
      <DarkMode>
        <Modal isOpen={isOpen}  onClose = {handleClose} isCentered>
          <ModalOverlay/>
          <ModalContent style={{borderRadius:'2rem', color:'white'}}>
            <ModalBody>
                <FormControl display='flex' justifyContent="space-between" flexDirection='column'>
                  <Text textAlign="center"> Select Genres</Text>

                  <Flex  justifyContent="center"> {/* rows of genre toggles*/}
                    {/* maybe map these from an array instead. It'd be harder to control the styling for it */}
                    <Flex flexDirection="column" tm='0' alignItems="center">
                      <FormLabel htmlFor='action' size='sm' mb='0'>
                          Action
                      </FormLabel>
                      <Switch id='action' mb='7px'/>
                      <FormLabel htmlFor='adventure' size='sm' mb='0'>
                          Adventure
                      </FormLabel>
                      <Switch id='adventure' mb='7px'/>
                      <FormLabel htmlFor='animation' size='sm' mb='0'>
                          Animation
                      </FormLabel>
                      <Switch id='animation' mb='7px'/>
                      <FormLabel htmlFor='comedy' size='sm' mb='0'>
                          Comedy
                      </FormLabel>
                      <Switch id='comedy' mb='7px'/>
                      <FormLabel htmlFor='crime' size='sm' mb='0'>
                          Crime
                      </FormLabel>
                      <Switch id='crime' mb='7px'/>
                      <FormLabel htmlFor='documentary' size='sm' mb='0'>
                          Documentary
                      </FormLabel>
                      <Switch id='documentary' />
                    </Flex>

                    <Flex flexDirection="column" alignItems="center">
                      <FormLabel htmlFor='drama' size='sm' mb='0'>
                          Drama
                      </FormLabel>
                      <Switch id='drama' mb='7px'/>
                      <FormLabel htmlFor='family' size='sm' mb='0'>
                          Family
                      </FormLabel>
                      <Switch id='family' mb='7px'/>
                      <FormLabel htmlFor='fantasy' size='sm' mb='0'>
                          Fantasy
                      </FormLabel>
                      <Switch id='fantasy' mb='7px'/>
                      <FormLabel htmlFor='history' size='sm' mb='0'>
                          History
                      </FormLabel>
                      <Switch id='history' mb='7px'/>
                      <FormLabel htmlFor='horror' size='sm' mb='0'>
                          Horror
                      </FormLabel>
                      <Switch id='horror' mb='7px'/>
                      <FormLabel htmlFor='music' size='sm' mb='0'>
                          Music
                      </FormLabel>
                      <Switch id='music' mb='7px'/>
                    </Flex>
                     
                    <Flex flexDirection="column" alignItems="center">
                      <FormLabel htmlFor='mystery' size='sm' mb='0'>
                          Mystery
                      </FormLabel>
                      <Switch id='mystery' mb='7px'/>
                      <FormLabel htmlFor='romance' size='sm' mb='0'>
                          Romance
                      </FormLabel>
                      <Switch id='romance' mb='7px'/>
                      <FormLabel htmlFor='scifi' size='sm' mb='0'>
                          Sci-Fi
                      </FormLabel>
                      <Switch id='scifi' mb='7px'/>
                      <FormLabel htmlFor='thriller' size='sm' mb='0'>
                          Thriller
                      </FormLabel>
                      <Switch id='thriller' mb='7px'/>
                      <FormLabel htmlFor='war' size='sm' mb='0'>
                          War
                      </FormLabel>
                      <Switch id='war' mb='7px'/>
                      <FormLabel htmlFor='western' size='sm' mb='0'>
                          Western
                      </FormLabel>
                      <Switch id='western' />
                    </Flex>
                    
                </Flex>{/* rows of genre toggles*/}

                <Flex flexDirection="column" justifyContent="center">
                  <FormLabel htmlFor='actor' textAlign="center" mb="2px">
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
                                <Switch id={provider.provider_name} />
                                </div>
                            ) 
                            })
                        }
                    </div>
                  {/* conditionally render / map stream providers for both users */}
                </Flex>
                
              </FormControl>
          </ModalBody>
          </ModalContent>
        </Modal>
      </DarkMode>
    )
}

export default FilterForm
