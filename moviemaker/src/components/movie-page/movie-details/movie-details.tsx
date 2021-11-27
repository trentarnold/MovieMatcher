import React from 'react'
import {Button} from '@chakra-ui/react'

const MovieDetails = () => {
    return (
        <div style={{display:'flex'}}>
            <div>
                <h1>profile picture</h1>
            </div>
            <div>
                <p>title</p>
                <p>description</p>
                <div>
                    <Button>Add to Watchlist</Button>
                    <Button>rate</Button> 
                    <Button>watch with friend</Button>     
                </div>
            </div>
        </div>
    )
}

export default MovieDetails
