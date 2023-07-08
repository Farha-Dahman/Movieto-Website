import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import About from './components/About/About';
import Movies from './components/Movies/Movies';
import NotFound from './components/NotFound/NotFound';
import TVshows from './components/TVShows/TVShows';
import Protected from './components/Protected/Protected';
import Profile from './components/Profile/Profile';
import PopularPeople from './components/People/PopularPeople/PopularPeople';
import TrendingPeople from './components/People/TrendingPeople/TrendingPeople';
import TrendingMovies from './components/Movies/TrendingMovies/TrendingMovies';
import PopularMovies from './components/Movies/PopularMovies/PopularMovies';
import TopRatedMovies from './components/Movies/TopRatedMovies/TopRatedMovies';
import UpcomingMovies from './components/Movies/UpcomingMovies/UpcomingMovies';
import Search from './components/Search/Search';
import { SearchProvider } from './components/Contexts/SearchContext';
import { GetUserFunc } from './components/Contexts/UserContext';
import SendCode from './components/SendCode/SendCode';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import MovieDetails from './components/Movies/MovieDetails/MovieDetails';
import TVShowsDetails from './components/TVShows/TVShowsDetails/TVShowsDetails';
import { Offline, Online } from 'react-detect-offline'
import OfflinePage from './components/OfflinePage/OfflinePage';
import ContactUs from './components/ContactUs/ContactUs';
import SearchDetails from './components/Search/SearchDetails';
import { GetFavoriteMovieFunc } from './components/Contexts/FavoriteContext';
import { ToastContainer } from 'react-toastify';

function App() {

  const routers = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'about', element: <About /> },
        { path: 'profile', element: <Protected><Profile /></Protected> },
        { path: 'movies', element: <Protected><Movies /></Protected> },
        { path: 'movies/:id', element: <MovieDetails /> },
        { path: 'tv/:id', element: <TVShowsDetails /> },
        { path: 'movies/:id', element: <SearchDetails /> },
        { path: 'popularPeople', element: <PopularPeople /> },
        { path: '/search/:query', element: <Search /> },
        { path: '/login/SendCode', element: <SendCode /> },
        { path: 'forgetPassword', element: <ForgetPassword /> },
        { path: 'trendingPeople', element: <TrendingPeople /> },
        { path: 'contactUs', element: <ContactUs /> },
        { path: 'trendingMovies', element: <Protected><TrendingMovies /></Protected> },
        { path: 'popularMovies', element: <Protected><PopularMovies /></Protected> },
        { path: 'topRatedMovies', element: <Protected><TopRatedMovies /></Protected> },
        { path: 'upcomingMovies', element: <Protected><UpcomingMovies /> </Protected> },
        { path: 'TVshows', element: <TVshows /> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])

  return (
    <>
      {/* <Offline>
        <OfflinePage /> 
      </Offline> */}
      <GetFavoriteMovieFunc>
        <GetUserFunc>
            <SearchProvider>
            <ToastContainer toastClassName="custom-toast" />              
            <RouterProvider router={routers}></RouterProvider>
            </SearchProvider>
        </GetUserFunc>
        </GetFavoriteMovieFunc>
    </>

  )
}

export default App;
