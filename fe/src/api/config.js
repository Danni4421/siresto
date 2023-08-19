export const config = {
  baseUrl: import.meta.env.VITE_BASEURL,
  crypto: {
    algorithm: import.meta.env.VITE_ENCRYPT_ALGORITHM,
    key: import.meta.env.VITE_ENCRYPT_KEY,
    iv: import.meta.env.VITE_ENCRYPT_IV,
    encodeType: 'base64',
  },
};
