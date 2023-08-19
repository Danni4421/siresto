import { useState } from 'react';
import { isAuth } from '../../api/auth';
import PropTypes from 'prop-types';
import DangerButton from '../Button/DangerButton';
import SuccessButton from '../Button/SuccessButton';
import AuthenticationsProfile from '../../Pages/auth/AuthenticationsProfile';

export const Bar = ({ children }) => {
  const [scroll, setScroll] = useState(false);

  const getScrollOffset = () => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 100) {
        setScroll(!scroll);
      } else {
        setScroll(false);
      }
    });
  };

  if (!scroll) {
    getScrollOffset();
  }

  return (
    <div
      className={`navbar p-5 flex justify-around items-center ${
        scroll
          ? 'w-11/12 fixed top-3 left-14 rounded-lg bg-white shadow-lg z-10'
          : 'w-full bg-dark-green text-cream'
      }`}
    >
      <div className="logo w-1/3">
        <h1
          className="text-5xl text-center logo"
          onClick={() => (window.location = '/')}
        >
          Siresto
        </h1>
      </div>
      <div className="navbar w-2/4">{children}</div>
      {isAuth() ? (
        <AuthenticationsProfile />
      ) : (
        <div className="flex gap-5">
          <button onClick={async () => (window.location = '/login')}>
            Login
          </button>
          <a href="/register">
            {!scroll ? (
              <DangerButton>Register</DangerButton>
            ) : (
              <SuccessButton>Register</SuccessButton>
            )}
          </a>
        </div>
      )}
    </div>
  );
};

Bar.propTypes = {
  children: PropTypes.any,
};
