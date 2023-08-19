import PropTypes from 'prop-types';

const SuccessButton = ({ clickHandler, children }) => {
  return (
    <button
      className={`px-6 py-1 font-light rounded-xl  mt-[-2px] bg-dark-green text-align text-cream shadow-sm`}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

SuccessButton.propTypes = {
  children: PropTypes.any,
  clickHandler: PropTypes.func,
};

export default SuccessButton;
