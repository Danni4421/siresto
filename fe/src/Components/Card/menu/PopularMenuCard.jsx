import { Rating } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const PopularMenuCard = ({ menu: { id, name, price, cover, category } }) => {
  const [average, setAverage] = useState();
  const [rater, setRater] = useState();

  useEffect(() => {
    const getRating = async () => {
      const rating = await axios.get(
        `http://localhost:5000/reviews/menu/${id}/rate`
      );
      return rating.data.data;
    };

    getRating().then((response) => {
      setAverage(response.average);
      setRater(response.rater);
    });
  }, [id]);

  return (
    <div className="w-64 h-auto text-center p-5 flex flex-col items-center">
      <img src={cover} alt={category} className="w-[300px] h-[300px] m-auto" />
      <h3 className="text-2xl mt-5 font-thin font-monospace">{name}</h3>
      <h4 className="menu-price font-serif">Rp.{price}</h4>
      <div className="rating w-3/4 flex justify-between mt-2">
        <Rating
          name="half-rating-read"
          value={average !== undefined ? average : 0}
          defaultValue={5}
          precision={0.5}
          readOnly
        />
        <h5>{rater}</h5>
      </div>
    </div>
  );
};

PopularMenuCard.propTypes = {
  menu: PropTypes.object,
};

export default PopularMenuCard;
