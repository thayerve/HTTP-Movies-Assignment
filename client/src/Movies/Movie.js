import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = event => {
    event.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(response => {
        console.log("DELETE call response: ", response);
        this.props.history.push('/')
        // this.setState({
        //   deleteSuccessMessage: response.data.successMessage,
        //   deleteError: ""
        // });
      })
      .catch(err => {
        console.log('Error in DELETE call: ', err.response);
        // this.setState({
        //   deleteSuccessMessage: "",
        //   deleteError: err.response.data.Error
        // });
      });
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="update-button" onClick={() => this.props.history.push(`/update-movie/${this.props.match.params.id}`)}>
          Update
        </div>
        <div className="delete-button" onClick={this.deleteMovie}>
          Delete
        </div>
      </div>
    );
  }
}
