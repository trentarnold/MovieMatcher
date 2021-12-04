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
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks';
import { useAppSelector, useAppDispatch } from '../redux/app/hooks';
import { selectMovieFilter, turnOffMovieFilter } from '../redux/features/modals/movieFilterSlice';
import { selectSocketRef } from '../redux/features/socket/socketRefSlice';
import { useEffect } from 'react'


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
            <ModalBody>
              <Flex width='580px' >
                <FormControl display='flex' justifyContent="space-between" flexDirection='column'>
                  <Flex alignItems="flex-start" justifyContent="center">
                    {/* maybe map these from an array instead. It'd be harder to control the styling for it */}
                    <Flex flexDirection="column" tm='0' alignItems="center">
                      <FormLabel htmlFor='action' size='sm' mb='0'>
                          Action
                      </FormLabel>
                      <Switch id='action' mb='20px'/>
                      <FormLabel htmlFor='adventure' size='sm' mb='0'>
                          Adventure
                      </FormLabel>
                      <Switch id='adventure' mb='20px'/>
                      <FormLabel htmlFor='animation' size='sm' mb='0'>
                          Animation
                      </FormLabel>
                      <Switch id='animation' mb='20px'/>
                      <FormLabel htmlFor='comedy' size='sm' mb='0'>
                          Comedy
                      </FormLabel>
                      <Switch id='comedy' mb='20px'/>
                      <FormLabel htmlFor='crime' size='sm' mb='0'>
                          Crime
                      </FormLabel>
                      <Switch id='crime' mb='20px'/>
                      <FormLabel htmlFor='documentary' size='sm' mb='0'>
                          Documentary
                      </FormLabel>
                      <Switch id='documentary' />
                    </Flex>
                    <Flex flexDirection="column" alignItems="center">
                      <FormLabel htmlFor='drama' size='sm' mb='0'>
                          Drama
                      </FormLabel>
                      <Switch id='drama' mb='20px'/>
                      <FormLabel htmlFor='family' size='sm' mb='0'>
                          Family
                      </FormLabel>
                      <Switch id='family' mb='20px'/>
                      <FormLabel htmlFor='fantasy' size='sm' mb='0'>
                          Fantasy
                      </FormLabel>
                      <Switch id='fantasy' mb='20px'/>
                      <FormLabel htmlFor='history' size='sm' mb='0'>
                          History
                      </FormLabel>
                      <Switch id='history' mb='20px'/>
                      <FormLabel htmlFor='horror' size='sm' mb='0'>
                          Horror
                      </FormLabel>
                      <Switch id='horror' mb='20px'/>
                      <FormLabel htmlFor='music' size='sm' mb='0'>
                          Music
                      </FormLabel>
                      <Switch id='music' mb='20px'/>
                      <FormLabel htmlFor='mystery' size='sm' mb='0'>
                          Mystery
                      </FormLabel>
                      <Switch id='mystery' />
                    </Flex>
                    <Flex flexDirection="column" alignItems="center">
                      <FormLabel htmlFor='romance' size='sm' mb='0'>
                          Romance
                      </FormLabel>
                      <Switch id='romance' mb='20px'/>
                      <FormLabel htmlFor='scifi' size='sm' mb='0'>
                          Sci-Fi
                      </FormLabel>
                      <Switch id='scifi' mb='20px'/>
                      <FormLabel htmlFor='tvMovie' size='sm' mb='0'>
                          TV Movie
                      </FormLabel>
                      <Switch id='tvMovie' mb='20px'/>
                      <FormLabel htmlFor='thriller' size='sm' mb='0'>
                          Thriller
                      </FormLabel>
                      <Switch id='thriller' mb='20px'/>
                      <FormLabel htmlFor='war' size='sm' mb='0'>
                          War
                      </FormLabel>
                      <Switch id='war' mb='20px'/>
                      <FormLabel htmlFor='western' size='sm' mb='0'>
                          Western
                      </FormLabel>
                      <Switch id='western' />
                    </Flex>
                </Flex>
                <Flex flexDirection="column" alignItems="center">
                  <FormLabel htmlFor='actor'>
                   Include Actor
                  </FormLabel>
                  <Input type="text" id='actor' width="350" />
                  {/* add actor to a list in the component that renders actor cards for each item */}
                </Flex>
                <Flex>
                  {/* conditionally render / map stream providers for both users */}
                </Flex>
              </FormControl>
            </Flex>
          </ModalBody>
        </Modal>
      </DarkMode>
    )
}

export default FilterForm
