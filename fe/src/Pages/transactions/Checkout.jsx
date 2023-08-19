import { TransactionsBar } from '../../Components/Navbar/TransactionsBar';
import { useEffect, useRef, useState } from 'react';
import { CheckoutCard } from '../../Components/transactions/CheckoutCard';
import { deleteCartById, getCartById } from '../../api/carts';
import { getMenuDetails } from '../../api/menu';
import { addTransactions } from '../../api/transactions';

export const Checkout = () => {
  const cartRef = useRef(JSON.parse(sessionStorage.getItem('LIST_CART')));
  const [total, setTotal] = useState(0);

  useEffect(() => {
    cartRef.current.map((cart) => {
      getCartById(cart).then((cartResponse) => {
        const { menuId, qty } = cartResponse;
        getMenuDetails(menuId).then((menuResponse) => {
          setTotal(menuResponse.menu.price * qty);
        });
      });
    });
  }, []);

  const PrintCart = () => {
    return cartRef.current.map((cart) => {
      return <CheckoutCard key={cart} cart={cart} />;
    });
  };

  const processTransactions = () => {
    cartRef.current.map((cart) => {
      getCartById(cart).then((cartResponse) => {
        const { menuId, qty } = cartResponse;
        addTransactions({ menuId, qty }).then((response) => {
          if (response !== null) {
            deleteCartById(cart);
          }
        });
      });
    });

    sessionStorage.removeItem('LIST_CART');
    window.location = '/';
  };

  return (
    <div className="h-[100vh] flex flex-col items-center bg-background mx-auto">
      <TransactionsBar value="Checkout" />

      <div className="bg-white w-11/12 mx-auto">
        <PrintCart />
      </div>

      <div className="flex justify-between items-center w-11/12 absolute bottom-5 rounded-lg p-10 bg-white">
        <div id="total">
          <h2 className="text-2xl">
            <span>Total pesanan: </span> {total}
          </h2>
          <h4>
            Total product (<span>{cartRef.current.length}</span>)
          </h4>
        </div>
        <div id="checkout-btn">
          <button
            className="px-20 py-5 bg-dark-green text-xl text-white rounded-lg"
            onClick={processTransactions}
          >
            Buat Pesanan
          </button>
        </div>
      </div>
    </div>
  );
};
