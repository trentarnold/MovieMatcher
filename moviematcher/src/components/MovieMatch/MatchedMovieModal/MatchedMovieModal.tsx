import React from 'react';
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
const MatchedMovieModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // useEffect(() => {
  //   if(open) {
  //     onOpen()
  //   }
  // }, [open])
  return (
    <DarkMode>
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay>
                <ModalContent>
                      <ModalHeader>
                      </ModalHeader>
                      <ModalBody>                         
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
