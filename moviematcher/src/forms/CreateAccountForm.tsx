import React from 'react'
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
import { FaLock, FaUserAlt, FaUserTag} from 'react-icons/fa';
import { selectCreateAccount, turnOffCreateAccount } from '../redux/features/modals/createAccountSlice';
import { useAppSelector, useAppDispatch } from '../redux/app/hooks';
import { turnOnLogin } from '../redux/features/modals/loginSlice';
import { setToken } from '../redux/features/modals/authSlice';
import { ServerApiService } from '../services/ServerApi';
const CreateAccountForm = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pic, setPic] = useState<File>()
  const [base64,setBase64] = useState<string | ArrayBuffer | null>('')
  const { isOpen, onOpen, onClose } = useDisclosure();
  const open = useAppSelector(selectCreateAccount);
  const dispatch = useAppDispatch()
  useEffect(() => {
    if(open) {
      onOpen()
    }
  }, [open])

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getBase64();
    let {accessToken, confirmed} = await ServerApiService.createUser({username:userName, email, password, profile_pic:base64});
      if (confirmed) {
        dispatch(setToken(accessToken))
        handleClose();
        setUserName('');
        setEmail('');
        setPassword('');
      } else {
        alert('Invalid information, try again.')
      }
    }

  const handleClose = () => {
    dispatch(turnOffCreateAccount());
    onClose()
  }
  const getBase64 = async() => {
    const reader = new FileReader();
    if(pic) reader.readAsDataURL(pic);
    reader.onload = function () {
      setBase64(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

    return (
      <Modal isOpen={isOpen}  onClose = {handleClose} isCentered>
      <ModalOverlay/>
      <ModalContent style={{borderRadius:'2rem'}}>
      <ModalHeader bgColor='navy' color='white'  style={{display:'flex', flexDirection:'column', 
                    justifyContent:'center', alignItems:'center', borderTopLeftRadius:'2rem', borderTopRightRadius:'2rem'}}>
              <Avatar size='lg' bg='navy'/>
              <div> Create Account! </div>
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
                <FormLabel forhtml='userName'>User Name </FormLabel>
                <InputGroup>
                  <InputLeftElement
                      pointerEvents="none"
                      children={<FaUserTag color="gray.300" />}
                    />
                  <Input 
                    type='text'
                    errorBorderColor="red.300"  
                    name='userName' 
                    placeholder='Enter your username ...' 
                    value = {userName} 
                    onChange = {(e:React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}>
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
              <Input type='file' onChange = {
                (e: React.FormEvent<HTMLInputElement>) => {
                  if (e.currentTarget.files) setPic(e.currentTarget.files[0])
                }
              }></Input>
            </ ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={() => {
                  handleClose();
                  dispatch(turnOnLogin())
                }}> Log in </Button>
              <Button mr={3} type='submit' > Create!  </Button>
            </ModalFooter>
          </form>
        </ModalContent>
    </Modal>
    )
}

export default CreateAccountForm
