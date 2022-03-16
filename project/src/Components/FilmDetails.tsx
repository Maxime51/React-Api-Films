import React, { useEffect, useState } from 'react';
import Credits from './Credits';



function FilmsDetails(props:any) {

  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster, setPoster] = useState("");
  const [budget, setBudget] = useState("");
  const [release_date, setRelease_date] = useState("");

  useEffect(() => {
    async function fetchMyAPI() {
      console.log(`https://api.themoviedb.org/3/movie/${props.idFilmSelect}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      const response = await fetch(`https://api.themoviedb.org/3/movie/${props.idFilmSelect}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      const responseFormat = await response.json();
      setTitle(responseFormat.title)
      setPoster(responseFormat.poster_path)
      setOverview(responseFormat.overview)
      setBudget(responseFormat.budget)
      setRelease_date(responseFormat.release_date);
      (document.getElementById("blocDetails") as any).style.background = `url(https://image.tmdb.org/t/p/w500/${responseFormat.backdrop_path}) `;
    }
    fetchMyAPI()
  }, []);

  return (
    <div className="container-fluid" >
      <div className='container'>
          <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={`https://image.tmdb.org/t/p/w500/${poster}`} className="card-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">{overview}</p>
                  <p className="card-text"><small className="text-muted">Budget: {budget} $</small></p>
                <p className="card-text"><small className="text-muted">Release date : {release_date}</small></p>
                <p>Credits :{<Credits idFilm={props.idFilmSelect}/>}</p>
              </div>
            </div>
          </div>
          </div>

          </div>
    </div>


  );
}

export default FilmsDetails;

