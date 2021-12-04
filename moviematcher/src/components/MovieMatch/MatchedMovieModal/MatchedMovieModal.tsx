import React, { useEffect} from 'react';
import './MatchedMovieModal.css';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  DarkMode,} from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/hooks';
  import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks';
  import { selectMatchedMovie, turnOffMatchedMovie } from '../../../redux/features/modals/matchedMovie';
  import { Movie } from '../../../../../interfaces/MovieInterface'
  type Props = {
    currentMovie : Movie
  }
const MatchedMovieModal:React.FC<Props> = ( { currentMovie }) => {
  const open = useAppSelector(selectMatchedMovie);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(open) {
      onOpen()
    }
  }, [open])
const handleClose = () => {
  dispatch(turnOffMatchedMovie());
  onClose();
}
  return (
    <DarkMode>
        <Modal isOpen={isOpen} onClose={handleClose} >
            <ModalOverlay>
                <ModalContent style ={{color:'white'}}>
                      <ModalHeader>
                      </ModalHeader>
                      <ModalBody>   
                           Did it                  
                      </ModalBody>
                      <ModalFooter>
                      </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    </DarkMode>
  )
}

export default MatchedMovieModal
