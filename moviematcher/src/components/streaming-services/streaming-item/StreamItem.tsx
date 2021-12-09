import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks';
import { selectAuth } from '../../../redux/features/modals/authSlice';
import { addUserStreaming, removeUserStreaming } from '../../../redux/features/user/userStreaming';
import { ServerApiService } from '../../../services/ServerApi';
require('./StreamingItem.css');

const StreamItem = ({provider, userSaved}: any) => {
  const accessToken = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [savedStream, setSavedStream] = useState<boolean>(userSaved);

  const handleStreamingClick = async () => {
    ServerApiService.toggleStreaming(accessToken, provider.provider_id);
    if (!savedStream) {
      dispatch(addUserStreaming(provider.provider_id));
      setSavedStream(true);
    } else {
      dispatch(removeUserStreaming(provider.provider_id));
      setSavedStream(false);
    };
  };

  const handleStreamingMovies = async () => {
    //call API for movies
    navigate(`/movies/${provider.provider_name}/${provider.provider_id}`)
  }

  return (
    <div className="stream-item">
      <div className={savedStream ? 'stream-item-container user-saved' : 'stream-item-container not-user-saved'} >
        <img src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`} alt='stream provider' title={provider.provider_name}></img>
        <div className='stream-item-buttons'>
          <button className="toggle-stream-button" onClick={handleStreamingClick}>{savedStream ? 'Remove' : 'Add'}</button>
          <button onClick={handleStreamingMovies}>View Movies</button>
        </div>
      </div>
    </div>
  )
}

export default StreamItem
