import React, {useEffect} from 'react'
import './RecentActivityModal.css'
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
import { useAppSelector, useAppDispatch } from '../../../redux/app/hooks';
import { selectActivityListModal, turnOffActivityListModal } from '../../../redux/features/modals/activityListModal';

type Props ={
  otherUserName: string,
  movieId:string
}

const RecentActivityModal:React.FC<Props> = ({otherUserName, movieId}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const open = useAppSelector(selectActivityListModal);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(open) {
      onOpen()
    }
  }, [open])
  const handleClose = () => {
    dispatch(turnOffActivityListModal());
    onClose();
  }

  return (
    <DarkMode>
      <Modal isOpen={open} onClose={handleClose} isCentered>
        <ModalOverlay>
          <ModalContent>
              <ModalHeader></ModalHeader>
              <ModalBody>This is it!</ModalBody>
              <ModalFooter></ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </DarkMode>
  )
}

export default RecentActivityModal
