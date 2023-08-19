import { useEffect, useState } from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import { deleteAuth, isAuth } from '../../api/auth';
import PropTypes from 'prop-types';

const AuthenticationsProfile = () => {
  const [acc, setAcc] = useState(false);
  const [authState, setAuthState] = useState({});
  const [initial, setInitial] = useState();

  useEffect(() => {
    const AUTH_STATE = JSON.parse(localStorage.getItem('AUTH_STATE'));
    const matches = AUTH_STATE.firstName.match(/\b(\w)/g);
    const acronym = matches.join('');
    setInitial(acronym);
    setAuthState(AUTH_STATE);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <BsFillCartFill
        className="text-2xl"
        onClick={() => (window.location = '/cart')}
      />
      <div className="flex mr-10 gap-5 cursor-pointer">
        <div className="identity">
          <div
            className={`w-[50px] h-[50px] bg-background rounded-full text-center flex items-center justify-center`}
            onClick={() => setAcc(!acc)}
          >
            <h1 className="text-dark-green text-2xl">{initial}</h1>
          </div>
        </div>
      </div>
      {acc && (
        <div className="w-[140px] text-right bg-dark-red absolute top-20 right-14 rounded-lg">
          <ul className="p-2">
            <li className="p-1">Hi, {authState.firstName}</li>
            <li
              className="p-1"
              onClick={() => {
                window.location = `/users/profile`;
              }}
            >
              Account
            </li>
            <li
              className="p-1"
              onClick={() => {
                window.location = !isAuth() ? '/login' : '/transactions';
              }}
            >
              Transactions
            </li>
            <li className="p-1" onClick={() => deleteAuth()}>
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

AuthenticationsProfile.propTypes = {
  auth: PropTypes.object,
  initial: PropTypes.any,
};

export default AuthenticationsProfile;
