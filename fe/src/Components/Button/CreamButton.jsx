import PropTypes from 'prop-types';

const CreamButton = ({ children }) => {
  return (
    <button
      className={`px-6 py-1 font-extralight rounded-xl  mt-2 bg-dark-cream text-align text-cream shadow-sm`}
    >
      {children}
    </button>
  );
};

CreamButton.propTypes = {
  children: PropTypes.any,
};

export default CreamButton;
