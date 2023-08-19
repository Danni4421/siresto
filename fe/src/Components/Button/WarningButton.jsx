import PropTypes from 'prop-types';

const WarningButton = ({ children }) => {
  return (
    <button
      className={`px-6 py-1 font-light rounded-xl  mt-[-2px] bg-orange-500 text-align text-cream shadow-sm`}
    >
      {children}
    </button>
  );
};

WarningButton.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
};

export default WarningButton;
