import PropTypes from 'prop-types';
import AuthenticationsProfile from '../../Pages/auth/AuthenticationsProfile';

export const TransactionsBar = ({ value }) => {
  return (
    <div className="w-full bg-background flex flex-col items-center py-5 rounded-lg">
      <div className="checkout w-11/12 h-24 bg-white flex justify-between">
        <div className="w-4/12 h-full p-5 flex items-end gap-2 text-dark-green">
          <h1 className="logo text-4xl pr-3 border-r-2 border-gray-300">
            Siresto
          </h1>
          <h2 className="motto font-semibold pl-2 text-2xl">{value}</h2>
        </div>

        <div className="profile flex items-center">
          <AuthenticationsProfile />
        </div>
      </div>
    </div>
  );
};

TransactionsBar.propTypes = {
  value: PropTypes.string.isRequired,
};
