import { ErrorAlert } from '../alert/ErrorAlert';

export const badRequest = (message, timer) => {
  ErrorAlert(message, timer);
};

export const notFoundError = (message, timer) => {
  ErrorAlert(message, timer);
};

export const tokenAgeExcededResponse = (message) => {
  ErrorAlert(message);

  setTimeout(() => {
    window.location = '/login';
  }, 1500);
};
