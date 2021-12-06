import React, {useEffect, useState} from 'react'
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
import { ServerApiService } from '../../../services/ServerApi';
import APIService from '../../../services/APISevice';
import { selectAuth } from '../../../redux/features/modals/authSlice';
import { User } from '../../../../../interfaces/responses';
import { UserPlaceholder } from '../../../UserPlaceholder';
import { MovieDetailsInterface } from '../../../../../interfaces/MovieDetails';
import { movieDetailsPlaceHolder} from '../../../moviePlaceholder';
import { setActivities } from '../../../redux/features/user/activitiesSlice';
import { addRating } from '../../../redux/features/user/ratingsSlice';
import ButtonHolder from '../../movie-page/movie-details/ButtonHolder';
import RateMovieModal from '../../movie-page/movie-details/RateMovieModal';
type Props ={
  otherUserName: string,
  movieId:string
}

const RecentActivityModal:React.FC<Props> = ({otherUserName, movieId}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentMovie, setCurrentMovie] = useState<MovieDetailsInterface>(movieDetailsPlaceHolder)
  const open = useAppSelector(selectActivityListModal);
  const accessToken = useAppSelector(selectAuth);
  const [otherUserInformation, setOtherUserInformation] = useState<any>(UserPlaceholder)
  const [ratingModalToggle, setRatingModalToggle] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  const [newRating, setNewRating] = useState<number>(0)
  useEffect(() => {
    let isCancelled = false;
    const getOtherUserInformation = async() => {
      const otherUser = await ServerApiService.getOtherUserByUserName(accessToken, otherUserName);
      if(!isCancelled) {
        setOtherUserInformation(otherUser);
      }
    }

    async function fetchMovie () {
        const movieDetails = await APIService.getIndividualMovie(movieId);
        if(!isCancelled) {
            setCurrentMovie(movieDetails);
        }
    }
    if(open) {
      onOpen()
      fetchMovie()
      getOtherUserInformation();
    }
    return () => {
      isCancelled = true;
    }
    
  }, [open])
  const handleClose = () => {
    dispatch(turnOffActivityListModal());
    onClose();
  }
  async function handleRatingSubmit() {
    ServerApiService.addRating(accessToken, currentMovie.id, newRating);
    const activities = await ServerApiService.getActivities(accessToken);
    dispatch(setActivities(activities));
    dispatch(addRating({movieid: currentMovie.id, rating: newRating}))
    setNewRating(0);
}
const handleAddToWatched = async() => {
  let response = await ServerApiService.addWatchedMovie(accessToken, {movieID: Number(movieId), friendID: otherUserInformation.id});
  const activities = await ServerApiService.getActivities(accessToken);
  dispatch(setActivities(activities));
  handleClose()
}
  return (
    <DarkMode>
      <Modal isOpen={open} onClose={handleClose} isCentered >
        <ModalOverlay zIndex='2'>
          <ModalContent style ={{color:'white', textAlign:'center'}} w='100vw' >
              <ModalHeader bgColor='rgb(0, 0, 92)'>
                <div>
                    {`You and ${otherUserInformation.username} watched ${currentMovie.title}`}
                </div>
              </ModalHeader>
              <ModalBody>
                <ButtonHolder setRatingModalToggle={setRatingModalToggle} setNewRating={setNewRating} movie ={currentMovie} flexColumn={true}/>
              </ModalBody>
              <ModalFooter style ={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Button onClick={handleAddToWatched}>Add to recently watched</Button>
              </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
                  {ratingModalToggle ? <RateMovieModal 
                rating={newRating} 
                setNewRating={setNewRating} 
                setRatingModalToggle={setRatingModalToggle} 
                submitRating={handleRatingSubmit}
                movie={currentMovie}
                /> : <div />}
    </DarkMode>
  )
}

export default RecentActivityModal
