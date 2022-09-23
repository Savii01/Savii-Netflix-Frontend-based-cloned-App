import './App.css';
import Banner from './Components/Banner/Banner';
import Nav from './Components/Navbar/Nav';
import Rows from './Components/Row/Rows'
import requests from './requests';



function App() {
  return (
    <div className="app">
      <Nav/>
     <Banner/>
     <Rows title = 'NETFLIX ORIGINALS' fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
     <Rows title = 'Trending Now' fetchUrl={requests.fetchTrending}/>
     <Rows title = 'Top Rated' fetchUrl={requests.fetchTopRated}/>
     <Rows title = 'Action Movies' fetchUrl={requests.fetchActionMovies}/>
     <Rows title = 'Comedy Movies' fetchUrl={requests.fetchComedyMovies}/>
     <Rows title = 'Horror Movies' fetchUrl={requests.fetchHorrorMovies}/>
     <Rows title = 'Romance Movies' fetchUrl={requests.fetchRomanceMovies}/>
     <Rows title = 'Documentaries Movies' fetchUrl={requests.fetchDocumentaries}/>
    </div>
  );
}

export default App;
