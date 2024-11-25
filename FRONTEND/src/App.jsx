import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer';
import CategoryList from './pages/category/CategoryList';
import Search from './pages/searched/Search.jsx';
import CollectionList from './pages/collections/CollectionList.jsx';
import ProductsDetails from './pages/category/ProductsDetails.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Cart from './pages/Cart.jsx';
import CheckOut from './pages/CheckOut.jsx';
import Orders from './pages/OrdersPage.jsx';
import ContactPage from './components/Contact.jsx';



function App() {

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/:categoryname' element={< CategoryList />} />
        <Route path='/search' element={< Search />} />
        <Route path='/collection' element={<CollectionList />} />
        <Route path='/product/:id' element={< ProductsDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<CheckOut />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/support' element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
