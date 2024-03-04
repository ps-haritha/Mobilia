import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import UserHome from './UserHome'; //cardProduct
import AddProduct from './AddProduct';
import ViewProduct from './ViewProduct';
import ManageProducts from './ManageProducts';
import CardProduct from './CardProduct';
import UpdateProduct from './UpdateProduct';
import Cart from './Cart';
import CartView from './CartView';
import Checkout from './Checkout';
import Payment from './Payment';
import AdminHome from './AdminHome';
import ManageFurniture from './ManageFurniture';
import ManageUser from './ManageUser';
import UserNavigation from './UserNavigation';
import View from './View';
import ViewCategory from './ViewCategory';
import MyOrders from './MyOrders';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signUp' element={<Signup/>}/>
      <Route path='/view/:id' element={<View/>}/>
      <Route path='/singleview/:category' element={<ViewCategory/>}/>
      <Route path='/userHome' element={<CardProduct/>}/>
      <Route path='/manageProducts' element={<ManageProducts/>}/>
      <Route path='/viewProduct/:id' element={<ViewProduct/>}/>
      <Route path='/addProduct/:id'  element={<AddProduct/>}/>
      <Route path='/updateProduct/:id'  element={<UpdateProduct/>}/>
      <Route path='/cart' element={<CartView/>} />
      <Route path='/checkout' element={<Checkout/>} />
      <Route path='/payment' element={<Payment/>} />
      <Route path='/myOrders' element={< MyOrders/>} />
      <Route path='/admin' element={< AdminHome/>}/>
      <Route path='/manageFurniture' element={<ManageFurniture/>}/>
      <Route path='/manageUser' element={<ManageUser/>}/>
      <Route path='/userNavigation' element={<UserNavigation  />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
