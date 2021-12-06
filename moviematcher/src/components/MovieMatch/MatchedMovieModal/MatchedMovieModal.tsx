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
  import { Movie } from '../../../../../interfaces/movieInterface';
  import StarRatings from 'react-star-ratings';
  type Props = {
    currentMovie : Movie,
    otherUserName: string,
    showOtherFriendAccept: boolean,
    declineWatchMovie: () => void,
    acceptWatchMovie: () => void,
  }

const MatchedMovieModal:React.FC<Props> = ( { currentMovie, otherUserName, declineWatchMovie, acceptWatchMovie, showOtherFriendAccept }) => {
  const open = useAppSelector(selectMatchedMovie);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const reduceToFiveStarRating = (averageVote:number):number => {
    return (averageVote / 2);
  }
  useEffect(() => {
    if(open) {
      onOpen()
    }
  }, [open])
  const handleClose = () => {
    dispatch(turnOffMatchedMovie());
    onClose();
  }
  const declineMovie = () => {
    handleClose()
    declineWatchMovie();
  }
  const acceptMovie = () => {
    acceptWatchMovie()
  }

  return (
    <DarkMode>
        <Modal closeOnOverlayClick={false} closeOnEsc={false} isOpen={open} onClose={handleClose} isCentered>
            <ModalOverlay>
                <ModalContent style ={{color:'white', textAlign:'center'}}>
                      <ModalHeader bgColor='rgb(0, 0, 92)'>
                        <div>{`You and ${otherUserName} have matched!`}</div>
                      </ModalHeader>
                      <ModalBody> 
                      <div className='modal-body-content'>  
                          <img style={{height:'200px'}} src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}  alt='poster'  />  
                          <div>
                            <div>  {currentMovie.title} </div>
                            <div className='star-rating'>            
                               <StarRatings
                                rating={reduceToFiveStarRating(currentMovie.vote_average)}
                                starDimension="20px"
                                starSpacing="1px"
                                starRatedColor='gold' />
                                <span className='vote-count'> ({currentMovie.vote_count}) </span>
                             </div>
                          </div>
                      </div>
                      </ModalBody>
                      <ModalFooter>
                        <div>
                          { showOtherFriendAccept && <div style={{color:'red'}}>{`${otherUserName} has already accepted this movie`}</div>}
                          <Button onClick={acceptMovie}>Let's watch it</Button>
                          <Button onClick={declineMovie}> Let's keep searching</Button>
                        </div>
                      </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    </DarkMode>
  )
}

export default MatchedMovieModal
