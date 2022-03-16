import React, { useEffect, useState } from 'react';
import FilmsPerGenres from './FilmsPerGenres';

type Film = {
  title: string
}

function FilmsNavBar() {
  const [listFilm, setlistFilm] = useState<string[]>([]);
  const [genreSelected, setGenreSelected] = useState(<></>);
  const [genre, setGenre] = useState("28");
  const [pageSelected, setpageSelected] = useState(1);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      const responseFormat = await response.json()
      setlistFilm(responseFormat.genres)
    }
    fetchMyAPI()
  }, []);

  useEffect(() => {
    console.log(pageSelected)
    if (pageSelected < 1) {
      setpageSelected(1)
    } else {
      setGenreSelected(<FilmsPerGenres genreSelect={genre} page={pageSelected} />);
    }
  }, [genre,pageSelected]);


  return (
    <div >
      <ul className="nav nav-tabs" >
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Genre</a>
          <ul className="dropdown-menu">
            {listFilm.map((element: any) => {
              return <li key={element.id} onClick={()=>setGenre(element.id)} className="dropdown-item" data-value={element.id}>{element.name}</li>;
            })}
          </ul>
        </li>
      </ul>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><a className="page-link" onClick={()=>setpageSelected(pageSelected-1)}>Previous</a></li>
          <li className="page-item"><a className="page-link" onClick={()=>setpageSelected(pageSelected+1)}>Next</a></li>
        </ul>
      </nav>
      {genreSelected}
    </div>
  );
}

export default FilmsNavBar;
