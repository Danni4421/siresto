import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getCartById } from '../../api/carts';
import { getMenuDetails } from '../../api/menu';

export const CheckoutCard = ({ cart }) => {
  const [menu, setMenu] = useState({});
  const [total, setTotal] = useState(0);
  const qtyRef = useRef();

  useEffect(() => {
    getCartById(cart).then((cartResponse) => {
      const { menuId, qty } = cartResponse;
      qtyRef.current = qty;
      getMenuDetails(menuId).then((menuResponse) => {
        setMenu(menuResponse.menu);
        setTotal(menuResponse.menu.price * qty);
      });
    });
  }, [cart]);

  return (
    <div className="px-10 flex flex-col rounded-lg">
      {/* Detail Pesanan */}
      <div className="flex justify-between items-center gap-3">
        <img src={menu.cover} alt="" className="w-[200px] h-[200px]" />
        <div id="title-details" className="w-7/12">
          <h2 className="text-3xl font-['roboto'] text-dark-green font-bold">
            {menu.name}
          </h2>
          <h4>{menu.category}</h4>
        </div>

        {/* Rincian Pesanan */}
        <div className="w-11/12 flex flex-col items-end">
          <div className="w-8/12">
            <ul className="flex justify-between">
              <li>Harga Satuan</li>
              <li>Jumlah</li>
              <li>Sub-Total</li>
            </ul>
          </div>
          <div className="w-8/12 flex justify-between">
            <div className="px-5">{menu.price}</div>
            <div id="qty" className="px-5">
              {qtyRef.current}
            </div>
            <div id="price" className="px-3">
              {total}
            </div>
          </div>
        </div>
      </div>

      {/* Rincian Pesanan */}
      <div className="text-right py-5 border-t-2 border-gray-300">
        <p>Sub Total</p>
        <h2 className="text-dark-green text-3xl">{total}</h2>
      </div>
    </div>
  );
};

CheckoutCard.propTypes = {
  cart: PropTypes.string,
  onRender: PropTypes.func,
};
