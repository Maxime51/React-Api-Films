import React, { useEffect, useState } from 'react';
import FilmDetails from './FilmDetails';


function FilmsPerGenres(props:any) {
  const [films, setFilms] = useState([]);
  const [filmDetailLoad, setFilmDetailLoad] = useState("");
  const [filmDetail,setFilmDetail] = useState(<></>);

  function loadFilmDetails(event: any) {
    setFilmDetailLoad(event.target.dataset.value)
    setFilmDetail(< FilmDetails />);
  }
  console.log(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${props.page}&with_genres=${props.genreSelect}&with_watch_monetization_types=flatrate`)
  useEffect(() => {
    async function fetchMyAPI() {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${props.page}&with_genres=${props.genreSelect}&with_watch_monetization_types=flatrate`)
      const responseFormat = await response.json()
      setFilms(responseFormat.results)
    }
    fetchMyAPI()
  }, [props.genreSelect, props.page]);


  if (filmDetailLoad === "") {
    return (
      <div className="container">
        <div className="row">
          {films.map((film: any) => {
            return (
              <div className="col-2 " >
                <div className="card">
                  <img src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title cardFormat">{film.title}</h5>
                    <a onClick={(loadFilmDetails)} data-value={film.id} className="btn btn-primary">View Info</a>
                  </div>
                </div>
              </div>)
          })};
        </div>
      </div>

    );
  } else {
    return (
      <div className="container">
        <ul className="pagination">
          <li className="page-item"><a className="page-link" onClick={()=>setFilmDetailLoad("")}>Back</a></li>
        </ul>
        {filmDetail}
      </div>
    );
  }
}

export default FilmsPerGenres;

