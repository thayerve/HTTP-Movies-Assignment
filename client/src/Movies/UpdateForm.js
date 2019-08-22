import React, { useState, useEffect } from 'react';
import axios from 'axios';

const emptyMovie = {
    director: "",
    id: "",
    metascore: "",
    stars: [],
    title: ""
}

export default function UpdateForm(props) {
    console.log('props to UpdateForm: ', props);

    const [movie, setMovie] = useState(emptyMovie);
    const id = props.match.params.id;

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
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('handleSubmit function called. Event: ', e);
    //     axios
    //   .put('')
    //   .then(res)
    //   .catch(err)
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
          type="text"
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