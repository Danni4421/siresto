import { useEffect, useState } from 'react';
import { TransactionsBar } from '../../Components/Navbar/TransactionsBar';
import SuccessButton from '../../Components/Button/SuccessButton';
import ShoppingBag from '../../assets/img/ShoppingBag.png';
import { getCarts } from '../../api/carts';
import { CartsCard } from '../../Components/Card/carts/CartsCard';

export const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [selectedCarts, setSelectedCarts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getCarts().then((response) => {
      if (response !== undefined) {
        setCarts(response.carts);
      }
    });
  }, []);

  const handlePickedCart = (cartId, isChecked, cartTotal) => {
    if (isChecked) {
      setSelectedCarts([...selectedCarts, cartId]);
      setTotal((prev) => prev + cartTotal);
    } else {
      setSelectedCarts(selectedCarts.filter((id) => id !== cartId));
      setTotal((prev) => prev - cartTotal);
    }
  };

  const GetCarts = () => {
    return carts.map((cart) => {
      return (
        <CartsCard
          key={cart.id}
          isSelected={selectedCarts.includes(cart.id)}
          onSelect={handlePickedCart}
          cart={cart}
        />
      );
    });
  };

  const checkout = () => {
    sessionStorage.setItem('LIST_CART', JSON.stringify(selectedCarts));
    window.location = '/checkout';
  };

  return (
    <div className="bg-background h-[100vh]">
      <TransactionsBar value="Keranjang Belanja" />

      {carts.length === 0 ? (
        <div className="w-[200px] h-[200px] mx-auto mt-10 flex flex-col gap-5">
          <img src={ShoppingBag} alt="keranjang" className="" />
          <h1 className="font-['roboto']">Keranjang Belanja Kosong</h1>
          <SuccessButton clickHandler={() => (window.location = '/menu')}>
            Belanja Sekarang
          </SuccessButton>
        </div>
      ) : (
        <div className="w-11/12 mx-auto">
          <div className="flex justify-between bg-white p-5">
            <div className="w-5/12 flex gap-2">
              <input type="checkbox" />
              <h4 className="">Product</h4>
            </div>
            <div className="flex w-7/12 justify-between">
              <h4 className="w-1/4 text-center">Harga Satuan</h4>
              <h4 className="w-1/4 text-center">Kuantitas</h4>
              <h4 className="w-1/4 text-center">Total Harga</h4>
              <h4 className="w-1/4 text-center">Aksi</h4>
            </div>
          </div>
          {carts.length > 0 && (
            <div id="list-cart">
              <GetCarts />
            </div>
          )}

          <div className="absolute bottom-5 p-5 rounded-lg bg-white w-11/12 flex justify-between items-center">
            <div>
              <h2>
                Product dipilih: <span>{selectedCarts.length}</span>
              </h2>
            </div>
            <div className="flex gap-5 items-center">
              <h2>
                Total (<span>{selectedCarts.length}</span> produk):{' '}
                <span className="text-3xl font-['roboto'] text-dark-green">
                  Rp{total}
                </span>
              </h2>
              <button
                className="px-10 py-2 bg-dark-green text-cream"
                onClick={checkout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
