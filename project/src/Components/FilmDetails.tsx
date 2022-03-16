import React, { useEffect, useState } from 'react';



function FilmsDetails(props:any) {

  const [film, setFilm] = useState(<></>);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${props.idFilmSelect}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      const responseFormat = await response.json();
      setFilm(
        <div className='container'>
          <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={`https://image.tmdb.org/t/p/w500/${responseFormat.poster_path}`} className="card-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                  <h5 className="card-title">{responseFormat.title}</h5>
                  <p className="card-text">{responseFormat.overview}</p>
                  <p className="card-text"><small className="text-muted">Budget: {responseFormat.budget} $</small></p>
                  <p className="card-text"><small className="text-muted">Product contry : {responseFormat.production_countries[0].name}</small></p>
                  <p className="card-text"><small className="text-muted">Release date : {responseFormat.release_date}</small></p>
              </div>
            </div>
          </div>
          </div>
        </div>)
    }
    fetchMyAPI()
  }, []);

  return (
    <div className="container">
      {film}
    </div>


  );
}

export default FilmsDetails;

