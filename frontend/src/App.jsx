import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignup from './Pages/LoginSignup'
import Footer from './Components/Footer/Footer'
import ShopContextProvider from './Components/Context/ShopContext'
import Admin from './admin/Admin'
import men_banner from './Components/Assets/mens_banner.jpg'
import women_banner from './Components/Assets/women_banner.jpg'
import banner from './Components/Assets/banner.jpg'

function App() {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category='men' />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category='women' />} />
          <Route path='/kids' element={<ShopCategory banner={banner} category='kid' />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/admin/*' element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ShopContextProvider>
  )
}
export default App
