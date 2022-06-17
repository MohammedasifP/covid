import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Signup } from './components/Signup/Signup';
import {Login} from './components/Longin/Longin'
import {Home} from './components/Home/Home'


function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/"  element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
       </Routes>
    </div>
  );
}

export default App;
