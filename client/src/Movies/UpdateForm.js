import React, { useState, useEffect } from 'react';
import axios from 'axios';



export default function UpdateForm(props) {
    console.log('UpdateForm rendered');
    const id = props.match.params.id;
    const emptyMovie = {
        director: "",
        id: id,
        metascore: "",
        stars: [],
        title: ""
    };
    const [movie, setMovie] = useState(emptyMovie);
    
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data);
                console.log('initial movie has been set after axios call: ', movie);
            })
            .catch(err => console.log(err.response));

    }, [id]);

    const handleChange = e => {
        e.persist();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
        console.log('current value of movie: ', movie);
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('handleSubmit function called.');
        // console.log(typeof movie.stars);
        // if(typeof movie.stars === "string") {
        //     const newStarsArray = movie.stars.split(",");
        //     setMovie({...movie, stars: newStarsArray});
        // };
        // ^ WIP trying to make movie.stars back into an array after editing
        axios
            .put('http://localhost:5000/api/movies/${id}', movie)
            .then(res => {
                console.log('PUT response: ', res.data);
                props.history.push('/');
            })
            .catch(err => console.log(err.response));

        
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
                value={movie.title}
            />
            <input
                type="text"
                name="director"
                onChange={handleChange}
                placeholder="Director"
                value={movie.director}
            />
            <input
                type="number"
                name="metascore"
                onChange={handleChange}
                placeholder="Metascore"
                value={movie.metascore}
            />
            <input
                type="text"
                name="stars"
                onChange={handleChange}
                placeholder="Stars"
                value={movie.stars}
            />

            <button>Submit</button>
        </form>
    );
}