import React from 'react';

const MovieDetails = ({title,image, releaseDate, description}) => {
    return(
        <div className="movie-details">
            <h1 style={{color: "whitesmoke"}}>{title}</h1>
            <img src= {image} alt= ""/>
            <h4 style={{color: "whitesmoke"}}>Release date - {releaseDate}</h4>
            <p style={{color: "whitesmoke"}}>{description}</p>
        </div>
    )
}

export default MovieDetails;