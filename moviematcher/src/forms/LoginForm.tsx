import {useState, useEffect} from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  FormLabel,
  FormControl,
  InputLeftElement,
  InputGroup,
  Input,
  ModalHeader,
  Avatar } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks';
import { FaLock, FaUserAlt} from 'react-icons/fa';
import { selectLogin, turnOffLogin } from '../redux/features/modals/loginSlice';
import { turnOnCreateAccount } from '../redux/features/modals/createAccountSlice';
import { useAppSelector, useAppDispatch } from '../redux/app/hooks';

 const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const open = useAppSelector(selectLogin)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(open) {
      onOpen()
    }
  }, [open])

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClose();
    setEmail('');
    setPassword('');
    }

  const handleClose = () => {
    dispatch(turnOffLogin());
    onClose();
  }

  const handleCreateAccount = () => {
    dispatch(turnOnCreateAccount());
    handleClose();
  }

  return (
    <Modal isOpen={isOpen}  onClose = {handleClose} isCentered>
      <ModalOverlay/>
      <ModalContent>
      <ModalHeader >
              <Avatar />
              <div> Log In! </div>
      </ModalHeader >
      <form onSubmit = {(e:React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <ModalBody pb={6}>
            <FormControl isRequired>
                <FormLabel forhtml='email-address'>Email Address  </FormLabel>
                <InputGroup>
                  <InputLeftElement
                      pointerEvents="none"
                      children={<FaUserAlt color="gray.300" />}
                    />
                  <Input 
                    autoFocus
                    errorBorderColor="red.300"  
                    name='email-address' 
                    placeholder='Enter your email' 
                    value = {email} 
                    onChange = {(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}>
                  </Input>
                </InputGroup> 
              </FormControl>
              <FormControl isRequired>
                <FormLabel forhtml='password'>Password </FormLabel>
                <InputGroup>
                  <InputLeftElement
                      pointerEvents="none"
                      children={<FaLock color="gray.300" />}
                    />
                  <Input 
                    type='password'
                    errorBorderColor="red.300"  
                    name='password' 
                    placeholder='Enter your password' 
                    value = {password} 
                    onChange = {(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}>
                  </Input>
                </InputGroup> 
              </FormControl>
            </ ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={handleCreateAccount}> Create Account </Button>
              <Button mr={3} type='submit'> Log In </Button>
            </ModalFooter>
          </form>
        </ModalContent>
    </Modal>
  )
}

export default LoginForm
