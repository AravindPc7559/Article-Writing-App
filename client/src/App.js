import './App.css';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/signUp/SignUp';
import {BrowserRouter , Route ,Routes} from 'react-router-dom'
import Home from './Components/Home/Home';
import BlogPosting from './Components/BlogPosting/BlogPosting';
import ButtonAppBar from './Components/ButtonAppBar/ButtonAppBar';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <ButtonAppBar/>
      <Routes>
        <Route path='/' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/myarticle' element={<BlogPosting/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
