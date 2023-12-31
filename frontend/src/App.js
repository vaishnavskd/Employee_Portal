
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Main from './elements/Main';
import UserDash from './components/UserDash';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home child={<Main/>}/>}/>
        <Route path='/login' element={<Home child={<Login/>}/>}/>
        <Route path='/signup' element={<Home child={<SignUp/>}/>}/>
        <Route path='/user' element={<UserDash/>}/>
      </Routes>
    </div>
  );
}

export default App;
