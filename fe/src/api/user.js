import axios from 'axios';
import { config } from './config';
import { deleteAuth } from './auth';
import { authConfig } from './token';

export const addUser = async ({
  username,
  firstName,
  lastName,
  password,
  email,
  address,
}) => {
  const result = await axios
    .post(`${config.baseUrl}/users`, {
      username,
      firstName,
      lastName,
      password,
      email,
      address,
    })
    .then((response) => {
      return response.data.data;
    });

  return result;
};

export const getIdentity = async (id) => {
  const result = await axios
    .get(`${config.baseUrl}/users/${id}`, authConfig)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        deleteAuth();
        window.location = '/login';
      }
    });

  return result;
};
