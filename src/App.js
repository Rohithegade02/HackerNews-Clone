/** @format */

import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NewNews from './components/NewNews';
import { Button } from '@mui/material';
import Header from './components/Header';
import TopNews from './components/TopNews';
import PastNews from './components/PastNews';
import TopNewsComment from './components/CommentNews';
import AskNews from './components/AskNews';
import ShowNews from './components/ShowNews';
import JobNews from './components/JobNews';
import CommentNews from './components/CommentNews';
import User from './components/User';
import RegistrationForm from './components/Registration';
import Login from './components/Login';
import Threads from './components/Threads';
import DiscussNews from './components/DiscussNews';
import Submit from './components/Submit';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/create-account' element={<RegistrationForm />} />
        <Route path='/threads' element={<Threads />} />
        <Route path='/newest' element={<NewNews />} />
        <Route path='/' element={<TopNews />} />
        <Route path='/past' element={<PastNews />} />
        <Route path='/comments/:id' element={<CommentNews />} />
        <Route path='/user/:id' element={<User />} />
        <Route path='/ask' element={<AskNews />} />
        <Route path='/show' element={<ShowNews />} />
        <Route path='/jobs' element={<JobNews />} />
        <Route path='/discuss/:id' element={<DiscussNews />} />
        <Route path='/submit' element={<Submit />} />
      </Routes>
    </div>
  );
}

export default App;
