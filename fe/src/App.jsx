import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { isAuth } from './api/auth';
import { Home } from './Pages/home/Home';
import { Menu } from './Pages/menu/Menu';
import { SignIn } from './Pages/authentications/SignIn';
import { SignUp } from './Pages/authentications/SignUp';
import { MenuDetails } from './Pages/menu/MenuDetails';
import { UserDetails } from './Pages/user/UserDetails';
import { NotFoundPage } from './Pages/page-not-found/NotFoundPage';
import { Cart } from './Pages/cart/Cart';
import { Checkout } from './Pages/transactions/Checkout';
import { Transactions } from './Pages/transactions/Transactions';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="menu" element={<Menu />}>
          <Route path=":menuId" element={<MenuDetails />} />
        </Route>
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />}></Route>

        {isAuth() && (
          <Route path="/">
            <Route path="transactions" element={<Transactions />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="cart" element={<Cart />} />
            <Route path="users">
              <Route path="profile" element={<UserDetails />} />
              <Route path="purchase" element={<div>User Purchase</div>} />
            </Route>
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default App;
