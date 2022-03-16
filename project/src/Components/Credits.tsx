import React, { useEffect, useState } from 'react';



function Credits(props:any) {

  const [cast, setCast] = useState([]);

  useEffect(() => {

    async function fetchMyAPI() {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${props.idFilm}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      const responseFormat = await response.json();

      setCast(responseFormat.cast)
    }
    fetchMyAPI()
  }, []);
  return (
    <div className="overflow-auto" >
    <div className="row flex-row flex-nowrap">
      {cast.map((element: any) => {
        return (
          <div className="col-3" >
            <div className="card card-block">
              <img src={`https://image.tmdb.org/t/p/w500/${element.profile_path}`} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title cardFormat">{element.name}</h5>
              </div>
            </div>
          </div>);
    })}</div></div>

  );
}

export default Credits;

