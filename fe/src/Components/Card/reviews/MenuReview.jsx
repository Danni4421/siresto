import { Rating } from '@mui/material';
import PropTypes from 'prop-types';

export const MenuReview = ({
  review: { firstName, lastName, comment, star },
}) => {
  return (
    <div className="w-full h-auto bg-white rounded-lg text-left py-5">
      <h3 className="text-xl mt-1 font-bold font-monospace text-dark-cream">
        {firstName + ' ' + lastName}
      </h3>
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
      <p>
        <q>{comment}</q>
      </p>
    </div>
  );
};

MenuReview.propTypes = {
  review: PropTypes.object,
};
