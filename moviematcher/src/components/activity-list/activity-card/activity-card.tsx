import React, {useState, useEffect} from 'react'
import moment from 'moment'
import './activity-card.css'
import { MovieDetailsInterface } from '../../../../../interfaces/MovieDetails';
import {IProfileInfo} from '../../../../../interfaces/userInterface';
import { ServerApiService } from '../../../services/ServerApi';
import APIService from '../../../services/APISevice';
import { useAppSelector } from '../../../redux/app/hooks';
import { selectAuth } from '../../../redux/features/modals/authSlice';
import { selectUserId } from '../../../redux/features/user/userIdSlice';

const ActivityCard = ({activity}: any) => {
    const accessToken = useAppSelector(selectAuth);
    const userID = useAppSelector(selectUserId);
    const [doer, setDoer] = useState<IProfileInfo>()
    const [friend, setFriend] = useState<IProfileInfo>();
    const [movie, setMovie] = useState<MovieDetailsInterface>();

    useEffect(() => {
        async function fetchData() {
            const movie = await APIService.getIndividualMovie(activity.movieid)
            setMovie(movie);
            const doer = await ServerApiService.getSpecificUser(accessToken, activity.uid)
            if (doer.id === userID) doer.username = 'You';
            setDoer(doer);
            if (activity.friendid) {
                const friend = await ServerApiService.getSpecificUser(accessToken, activity.friendid);
                if (friend.id === userID) {
                    friend.username = doer.username;
                    doer.username = 'You'
                };
                setFriend(friend)
            }
        }
        fetchData()
    }, [activity])

    function outputActivity() {
        if (doer && movie) {
            switch (activity.type){
                case 'whitelist':
                    return <p>{doer.username} added {movie.original_title} to {doer.username === 'You' ? 'your' : 'their'} Watchlist</p>
                case 'blacklist':
                    return <p>{doer.username} added {movie.original_title} to {doer.username === 'You' ? "your" : 'their'} Blacklist</p>
                case 'rating':
                    return <p>{doer.username} rated {movie.original_title} {activity.rating} {activity.rating > 1 ? "stars" : "star"}</p>
                case 'watched_movie':
                    return <p>{doer.username} watched {movie.original_title}{friend ? ' with ' + friend.username : ''}</p>
            }
        } else return <div>Loading</div>
    }

    return (
        <div className="activity-card">
            <div>
                {movie 
                    ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie poster" style={{height: "6rem"}}></img>
                    : <div />
                }
            </div>
            <div className="activity-info">
                {outputActivity()}
                <p>{moment(activity.createdAt).format('dddd MMM D, YYYY')}</p>
            </div>
            <div className="activity-movie-thumb"></div>
        </div>
    )
}

export default ActivityCard
