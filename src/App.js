
import { Route, Routes } from 'react-router-dom';
import './App.css';

import DialogsContainer from './components/Dialogs/DialogsContainer';
import Nav from './components/Nav/Nav';
const Music = lazy(() => import('./components/Music/Music'));
const Setting = lazy(() => import('./components/Setting/Setting'));
const UserFollowContainer = lazy(() => import('./components/userFollow/UserFollowContainer'));
const ProfileContainer = lazy(() => import('./components/Content/ProfileContainer'));
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import Preloader from './components/Preloader/Preloader';
import ErrorMessage from './components/Content/MyPosts/ErrorMessage';







const App = (props) => {

  const dispatch = useDispatch()
  const {initialized, error} = useSelector(state => ({
    initialized: state.app.initialized, 
    error: state.app.error
  }))
    
   
  

  useEffect(() => {
        dispatch(initializeApp())
  }, [dispatch])
 

    
    if (error) { 
      return <ErrorMessage message = {error} onRetry={() => dispatch(initializeApp())} />
    }

    if (!initialized) {
      return <Preloader />
    } //делаем проверку, если промисы еще не пришли то показываем загрузку



  return (
    <div className='first'>
      <HeaderContainer />
      <Nav />
      <div className='content'>
        <Routes>
          <Route path="/dialogs"
            element={<DialogsContainer />} />

          <Route path="/profile/:userId?"
            element={<ProfileContainer />} />

          <Route path="/users"
            element={<UserFollowContainer />} />

          <Route path="/music" element={<Music />} />

          <Route path="/setting" element={<Setting />} />

          <Route path="/login" element={<Login />} />

        </Routes>
      </div>
    </div>
  )
}



export default App;
