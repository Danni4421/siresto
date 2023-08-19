export const authConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
  },
};
