import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import AddProduct from './AddProduct'
import ListProduct from './ListProduct'

const Admin = () => (
  <div className='admin' style={{ display: 'flex' }}>
    <Sidebar />
    <Routes>
      <Route path='addproduct' element={<AddProduct />} />
      <Route path='listproduct' element={<ListProduct />} />
      <Route path='*' element={<ListProduct />} />
    </Routes>
  </div>
)
export default Admin
