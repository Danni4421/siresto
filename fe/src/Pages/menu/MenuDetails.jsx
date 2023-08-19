import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiSolidCartAdd } from 'react-icons/bi';
import { getMenuDetails, getMenuRating } from '../../api/menu';
import { getMenuReview } from '../../api/reviews';
import { Rating } from '@mui/material';
import { MenuReview } from '../../Components/Card/reviews/MenuReview';
import { isAuth } from '../../api/auth';
import { addCarts, getCartByMenuId, putCartById } from '../../api/carts';
import { SuccessAlert } from '../../alert/SuccessAlert';
import { ErrorAlert } from '../../alert/ErrorAlert';

export const MenuDetails = () => {
  const { menuId } = useParams();
  const [menuDetail, setMenuDetail] = useState({});
  const [stock, setStock] = useState(0);
  const [review, setReview] = useState([]);
  const [average, setAverage] = useState();
  const [rater, setRater] = useState();

  useEffect(() => {
    getMenuDetails(menuId).then((res) => {
      setMenuDetail(res.menu);
      setStock(res.stock.stock);
    });

    getMenuReview(menuId).then((res) => {
      setReview(res.review);
    });

    getMenuRating(menuId).then((res) => {
      setAverage(res.average);
      setRater(res.rater);
    });
  }, [menuId]);

  const GetMenuReviews = () => {
    return review.map((r) => {
      return <MenuReview key={r.id} review={r} />;
    });
  };

  const addToCart = () => {
    if (isAuth()) {
      alert('kesini oi');
      getCartByMenuId(menuId).then((response) => {
        if (response === 404) {
          addCarts({ menuId, qty: 1 }).then((response) => {
            if (response === 201) {
              SuccessAlert('Berhasil menambahkan ke keranjang belanja');
            }
          });
        }

        if (response.id) {
          const { id, qty } = response;
          putCartById(id, qty + 1).then((response) => {
            if (response === 200) {
              SuccessAlert('Berhasil menambahkan ke keranjang belanja');
            } else {
              ErrorAlert(
                'Gagal menambahkan ke keranjang belanja, Stock bahan baku tidak cukup',
                1500
              );
            }
          });
        }
      });
    }
  };

  const addTransaction = () => {
    if (isAuth()) {
      getCartByMenuId(menuId).then((response) => {
        if (response === 404) {
          addCarts({ menuId, qty: 1 }).then((response) => {
            if (response === 201) {
              SuccessAlert('Berhasil menambahkan ke keranjang belanja');
            }
          });
        }

        if (response.id) {
          const { id, qty } = response;
          putCartById(id, qty + 1).then((response) => {
            if (response !== 200) {
              ErrorAlert(
                'Gagal menambahkan ke keranjang belanja, Stock bahan baku tidak cukup',
                1500
              );
            }
          });
        }
      });

      window.location = '/checkout';
    }
  };

  return (
    <div className="w-8/12 h-[80vh] py-24 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-md absolute bg-white shadow-lg flex justify-center">
      <div className="absolute right-7 top-4 text-3xl cursor-pointer">
        <AiOutlineCloseCircle onClick={() => (window.location = '/menu')} />
      </div>
      <img src={menuDetail.cover} alt="" className="w-[500px] h-[500px] px-5" />
      <div className="flex w-2/5 h-[100%] flex-col">
        <div className="text-3xl">{menuDetail.name}</div>
        <div className="rating flex">
          <span>{average}</span>
          <Rating
            className="mt-[-2px] mr-2"
            name="half-rating-read"
            value={average !== undefined ? average : 0}
            defaultValue={5}
            precision={0.5}
            readOnly
          />
          <span className="border-l-2 px-3 border-gray-300">
            Penilaian {rater}
          </span>
          <span className="border-l-2 pl-3 border-gray-300">Stock {stock}</span>
        </div>
        <q>{menuDetail.category}</q>
        <div className="px-3 py-5 my-3 bg-background rounded-sm">
          <div className="font-[roboto] text-xl font-semibold text-dark-red">
            Rp.{menuDetail.price}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-3 p-2 border-solid border-2 border-green-400 bg-green-200 text-green-600"
            onClick={addToCart}
          >
            <BiSolidCartAdd className="text-2xl" /> Masukkan Keranjang
          </button>
          <button
            className="w-[120px] bg-green-400 text-white"
            onClick={addTransaction}
          >
            Beli
          </button>
        </div>
        <div className="review w-full h-[800px] overflow-scroll">
          <GetMenuReviews />
        </div>
      </div>
    </div>
  );
};

MenuDetails.propTypes = {
  id: PropTypes.string,
};
