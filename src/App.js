import logo from './logo.svg';
import './App.css';
import Product from './shop/Product';
import List from './shop/List';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Buy from './shop/Buy';
function App() {
  return (
    <div className="container">
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Product />}></Route>
          <Route path='/list' element={<List />}></Route>
          <Route path='/buy' element={<Buy />}></Route>
        </Routes>
        
        
      </BrowserRouter>
    </div>


  );
}

export default App;
