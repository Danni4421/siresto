import axios from 'axios';
import { config } from './config';

export const getReviews = async () => {
  const result = await axios.get(`${config.baseUrl}/reviews`);
  return result.data.data;
};

export const getMenuReview = async (menuId) => {
  const result = await axios.get(`${config.baseUrl}/reviews/menu/${menuId}`);
  return result.data.data;
};
