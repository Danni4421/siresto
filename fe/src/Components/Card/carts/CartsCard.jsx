import { useEffect, useState } from 'react';
import { CiTrash } from 'react-icons/ci';
import PropTypes from 'prop-types';
import { getMenuDetails } from '../../../api/menu';
import { deleteCartById, putCartById } from '../../../api/carts';
import { SuccessAlert } from '../../../alert/SuccessAlert';
import Swal from 'sweetalert2';

export const CartsCard = ({
  cart: { id, menuId, qty },
  isSelected,
  onSelect,
}) => {
  const [quantity, setQuantity] = useState(qty);
  const [menu, setMenu] = useState({});
  const [select, setSelect] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getMenuDetails(menuId).then((response) => {
      setMenu(response.menu);
      setTotal(response.menu.price * qty);
    });
  }, [menuId, qty]);

  useEffect(() => {
    if (quantity !== qty && quantity > 0) {
      putCartById(id, quantity).then((res) => {
        if (res === 200) {
          setTotal(menu.price * quantity);
        }
      });
    }

    if (quantity <= 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteCartById(id).then((response) => {
            if (response === 200) {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
              window.location = '/cart';
            }
          });
        } else {
          setQuantity((prev) => prev + 1);
        }
      });
    }

    setSelect(isSelected);
  }, [id, menu, quantity, qty, isSelected]);

  const deleteCart = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCartById(id).then((res) => {
          if (res === 200) {
            SuccessAlert(
              `Berhasil menghapus ${menu.name} pada keranjang belanja.`
            );
            window.location = '/cart';
          }
        });
      }
    });
  };

  const handlePickedCart = (cartId, isChecked, total) => {
    onSelect(cartId, isChecked, total);
  };

  return (
    <div
      className="flex justify-between w-full my-5 p-5 items-center bg-white"
      id={id}
    >
      <div className="flex w-5/12 gap-5 items-center">
        <img src={menu.cover} alt="" width={'100px'} height={'100px'} />
        <div>
          <h2>{menu.name}</h2>
          <p>{menu.category}</p>
        </div>
      </div>
      <div className="w-7/12 flex justify-between items-center">
        <div className="w-1/4 text-center">
          <p>{menu.price}</p>
        </div>
        <div className="w-1/4 text-center">
          <div className="w-1/2 flex mx-auto">
            <input
              type="button"
              value="-"
              onClick={() => {
                setQuantity((prev) => prev - 1);
              }}
              className="w-1/4 text-lg border-2 border-gray-200"
            />
            <input
              type="number"
              id="input-quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              onBlur={(e) => {
                if (e.target.value === '') {
                  setQuantity(0);
                }

                setQuantity(e.target.value);
              }}
              className="w-2/4 border-y-2 text-center border-gray-200"
            />
            <button
              className="w-1/4 text-lg border-2 border-gray-200"
              onClick={() => {
                setQuantity((prev) => prev + 1);
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="w-1/4 text-center">
          <p>{total}</p>
        </div>
        <div className="w-1/4 text-center flex gap-2">
          <button
            className="px-5 py-2 bg-dark-red text-white rounded-lg"
            onClick={() => {
              setSelect(!select);
              handlePickedCart(id, !select, total);
            }}
          >
            {select ? 'Batalkan' : 'Pilih'}
          </button>
          <button
            className="px-5 py-2 bg-dark-red text-white rounded-lg"
            onClick={deleteCart}
          >
            <CiTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

CartsCard.propTypes = {
  cart: PropTypes.object,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
};
