import { config } from './config';
import axios from 'axios';

export const getMenu = async () => {
  const result = await axios.get(`${config.baseUrl}/menu`);
  return result.data.data;
};

export const getMenuDetails = async (menuId) => {
  const menu = await axios
    .get(`${config.baseUrl}/menu/${menuId}`)
    .then((response) => {
      return response.data.data.menu;
    });
  const stock = await axios
    .get(`${config.baseUrl}/menu/${menuId}/stock`)
    .then((response) => {
      return response.data.data.stock;
    });

  return {
    menu,
    stock,
  };
};

export const getMenuRating = async (menuId) => {
  const result = await axios.get(
    `${config.baseUrl}/reviews/menu/${menuId}/rate`
  );
  return result.data.data;
};

export const searchMenu = async (name) => {
  const result = await axios.get(`${config.baseUrl}/menu/search?name=${name}`);
  return result.data.data;
};

// export const id = {
//   encrypt: async (menuId) => {},

//   decrypt: (val) => {},
// };
