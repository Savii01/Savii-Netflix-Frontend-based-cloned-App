import movieTrailer from 'movie-trailer'
import React from 'react'
import {useEffect, useState} from 'react'
import YouTube from 'react-youtube'
import axios from '../../axios' 
import './Rows.css'
/*
it is imported from axios.js not the regular axios, 
and in the axios.js file we exported it as Instance 
but we when calling it in another file we can change 
the name cause its like our default file not a regular 
import like the useState.
 
*/ 

const base_URL = 'https://image.tmdb.org/t/p/original/'

function Rows({ title, fetchUrl, isLargeRow}) {
    const[movies, setMovies]= useState([]);
    const [trailerUrl, setTrailerUrl] = useState("")

// A snippet of code which runs based on a specific condition
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl) ;
            /*this get url from our base url  in axios.js 
            i.e (baseURL : 'https://api.themoviedb.org/3',) 
            and also our end points from the request.js 
            e.g(fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`)
            so we in total this is what this code does, it join our base url and request end points together
            so we could have this
            (`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`)
            but in place of the word API_KEY is our real API key
            */
            setMovies(request.data.results);
           return request;
        }
        fetchData()
//if [], run once when the row loads (only on page load) and don't run it again
    }, [fetchUrl]);
    /*
        [fetchUrl] is a dependency we get from await axios.get(fetchUrl)
        in actual sense this loads what we get from our endpoints.
        the reason why it is the "fetchUrl" is that we are telling useEffect that 
        we are using a variable "fetchUrl"  which is out side of the block. So in that way
        useEffect know that something changed and it needs to refile the code...
    */
        //console.table(movies);

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    }

    const handleClick = (movie) => {
        if(trailerUrl){
          setTrailerUrl('')
        }else{
          movieTrailer(movie?.name || "")
          .then((url)  =>{
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get("v"))
          }).catch(error => console.log(error))
        }
    }

  return (
    <div className='rows'>
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map(movie =>(
            <img 
                onClick={() => handleClick(movie)}
                key={movie.id}
                className={`row_poster ${isLargeRow && 'row_poster_large'}`} 
                src={`${base_URL}${isLargeRow? movie.poster_path : movie.backdrop_path}`} 
                alt={movie.name}
            />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  )
}

export default Rows