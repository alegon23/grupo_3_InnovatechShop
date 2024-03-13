import '../assets/css/App.css'
import Contenido from './Contenido'
import Sidebar from './Sidebar'
import {Link, Route,Routes} from 'react-router-dom'
import ProductDetail from "./ProductDetail";
import LastProduct from './LastProduct';
import Categories from './Categories';
import ProductsList from './ProductsList';



function App() {
  return (
      <div id='wrapper'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Contenido/>}/>
          <Route path='/lastProduct' element={<LastProduct/>}/>
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/products' element={<ProductsList/>}/>
          

          <Route path='/ProductDetail'  element= {<ProductDetail/>}/>
          </Routes>
      </div>
  )
}

export default App
