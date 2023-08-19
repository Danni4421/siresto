import { Rating } from '@mui/material';
import PropTypes from 'prop-types';

export const UserReview = ({
  review: { firstName, lastName, menuName, comment, star },
}) => {
  return (
    <div className="w-64 h-auto shadow-md shadow-gray-400 bg-white rounded-lg text-left p-5">
      <h3 className="text-xl mt-1 font-bold font-monospace text-dark-cream">
        {firstName + ' ' + lastName}
      </h3>
      <h4>{menuName}</h4>
      <p>
        <q>{comment}</q>
      </p>
      <div className="rating flex">
        <Rating
          className="mt-[-2px] mr-2"
          name="half-rating-read"
          value={parseFloat(star) !== undefined ? parseFloat(star) : 0}
          defaultValue={5}
          precision={0.5}
          readOnly
        />
        <span>({star})</span>
      </div>
    </div>
  );
};

UserReview.propTypes = {
  review: PropTypes.object.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  menuName: PropTypes.string,
  comment: PropTypes.string,
  star: PropTypes.number,
};
