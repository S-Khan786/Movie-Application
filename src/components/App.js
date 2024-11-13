import { data } from '../data'
import { connect } from 'react-redux';
import Navbar from './Navbar';
import React from 'react';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';
// import { search } from '../reducers';
// import { connect } from '../index';

class App extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;

    // store.subscribe(() => {
    //   console.log("UPDATED");
    //   this.forceUpdate();
    // })

    //make api call 
    //dispatch action
    dispatch(addMovies(data));

    // console.log('STATE', store.getState());
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);

    if(index !== -1) {
      //We found the movie
      return true;
    }
    return false;
    
  }

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  }

  render() {  
    const { movies, search } = this.props;  // {movies: {list: [], favourites: [], showFavourites: false}, search: {result: {}}}
    const { list, favourites, showFavourites } = movies;

    
    // console.log('RENDER', this.props.store.getState());


    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar search={search}/>
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>
  
          <div className="list">
            {displayMovies.map((movie, index) => ( //I use () instead of {} bcz it automatically return <MovieCard/>
              //if i use {} then we need to write explicitly return before <MovieCard/>
              //() helpful when we have only one expression
              <MovieCard 
                movie={movie} 
                key={`movies-${movie.imdbID}`} 
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>  
          {displayMovies.length === 0 ? <div className='no-movies'>No Movies to display!</div> : null}
        </div>
      </div>
    );
  }

}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     )
//   }
// }

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search
  }
};

const connectedAppComponent = connect(mapStateToProps)(App)


export default connectedAppComponent;
