import React, { useEffect, useState } from 'react';
import FilmDetails from './FilmDetails';


function FilmsPerGenres(props:any) {
  const [films, setFilms] = useState([]);
  const [filmDetailLoad, setFilmDetailLoad] = useState("");
  const [filmDetail,setFilmDetail] = useState(<></>);

  function loadFilmDetails(id: any) {
    setFilmDetailLoad(id)
    setFilmDetail(< FilmDetails idFilmSelect={id}/>);
  }
  useEffect(() => {
    async function fetchMyAPI() {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=${props.page}&with_genres=${props.genreSelect}&with_watch_monetization_types=flatrate`)
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
              <div className="col-2" data-value={film.id} onClick={()=>(loadFilmDetails(film.id))}  >
                <div className="card">
                  <img src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title cardFormat">{film.title}</h5>
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

