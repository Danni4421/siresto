import PropTypes from 'prop-types';

const DangerButton = ({ children }) => {
  return (
    <button
      className={`px-6 py-1 font-light rounded-xl  mt-[-2px] bg-dark-red text-align text-cream shadow-sm`}
    >
      {children}
    </button>
  );
};

DangerButton.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
};

export default DangerButton;
