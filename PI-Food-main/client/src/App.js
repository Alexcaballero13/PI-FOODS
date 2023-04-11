import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home page/Home'
import RecipeDetail from './components/Detail page/RecipeDetail'
import Landing from './components/Landing page/Landing'
import Form from './components/Form page/Form'

function App() {
  return (
    <Routes>
      <Route path='/Landing' element={<Landing/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/RecipeDetail/:id' element={<RecipeDetail/>}/>
      <Route path='/Form' element={<Form/>}/>
    </Routes>
  );
}

export default App;
