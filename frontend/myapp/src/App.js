
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login/login';
import SinglePost from './components/singlepost/Singlepost';

import Topbar from './components/topbar/Topbar';
import Home from './pages/home/home';
import Settings from './pages/setting/setting';
import Single from './pages/single/single';
import Write from './pages/write/Write';
import Register from './pages/register/register';
import { useContext } from 'react';
import { Context } from './context/Context';


function App() {
  const {user} = useContext(Context)
  return (
    <BrowserRouter>
    <Topbar/>
    <Routes>
      <Route path='/' element={user? <Home/>:<Login />} />
      <Route path='/login' element={user? <Home/> : <Login />} />
      <Route path='/login' element={user?<Settings /> : <Login />} />
      <Route path='/write' element={user?<Write />: <Login />} />
      <Route path='/signup' element={user? <Home/>:<Register />} />
      <Route path='/post/:id' element={<Single />} />
      <Route path='/setting' element={ user? <Settings />: <Login/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;

