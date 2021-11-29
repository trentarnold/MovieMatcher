import React, {useState} from 'react'
import MovieThumb from '../../movie-list/movie-thumb/movie-thumb'
import './activity-card.css'

const ActivityCard = () => {

    const [username] = useState('TestUsername');
    const [movieName] = useState('Test Movie Name');
    const [time] = useState(Date.now());
    const [mockMovie] = useState({
        adult: false,
        backdrop_path: "/dK12GIdhGP6NPGFssK2Fh265jyr.jpg",
        genre_ids: [ 28, 35, 80],
        id: 512195,
        original_language: "en",
        original_title: "Red Notice",
        overview: "An Interpol-issued Red Notice is a global alert to hunt and capture the world's most wanted. But when a daring heist brings together the FBI's top profiler and two rival criminals, there's no telling what will happen.",
        popularity: 5865.04,
        poster_path: "/wdE6ewaKZHr62bLqCn7A2DiGShm.jpg",
        release_date: "2021-11-04",
        title: "Red Notice",
        video: false,
        vote_average: 6.9,
        vote_count: 1514})

    return (
        <div className="activity-card">
            <div className="activity-info">
                <p>{username} watched {mockMovie.original_title} </p>
                <p>{String(time)}</p>
            </div>
            <div className="activity-movie-thumb"></div>
            <MovieThumb movie={mockMovie}/> 
        </div>
    )
}

export default ActivityCard
