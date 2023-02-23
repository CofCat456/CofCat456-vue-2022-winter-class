import axios from 'axios';

const { VITE_URL, VITE_PATH } = import.meta.env;

const loginUrl = `${VITE_URL}/admin/signin`;
const logoutUrl = `${VITE_URL}/logout`;
const checkLoginUrl = `${VITE_URL}/api/user/check`;
const productsUrl = `${VITE_URL}/v2/api/${VITE_PATH}/products`;
const productUrl = `${VITE_URL}/v2/api/${VITE_PATH}/product`;
const cartUrl = `${VITE_URL}/api/${VITE_PATH}/cart`;
const orderUrl = `${VITE_URL}/api/${VITE_PATH}/order`;

const adminProductUrl = `${VITE_URL}/api/${VITE_PATH}/admin/product`;
const uploadFileUrl = `${VITE_URL}/api/${VITE_PATH}/admin/upload`;

export const loginApi = (data) => axios.post(loginUrl, data);
export const logoutApi = () => axios.post(logoutUrl);
export const getProductsApi = () => axios.get(productsUrl);
export const getProductApi = (id) => axios.get(`${productUrl}/${id}`);
export const getCartApi = () => axios.get(cartUrl);
export const addToCartApi = (data) => axios.post(cartUrl, data);
export const updateCartApi = (id, data) => axios.put(`${cartUrl}/${id}`, data);
export const removeCartApi = (id) => axios.delete(`${cartUrl}/${id}`);
export const removeAllCartApi = () => axios.delete(`${cartUrl}s`);

export const checkLoginApi = () => axios.post(checkLoginUrl);
export const checkoutApi = (data) => axios.post(orderUrl, data);
export const getAdminProductsApi = (page) => axios.get(`${adminProductUrl}s?page=${page}`);
export const addAdminProductApi = (data) => axios.post(adminProductUrl, data);
export const editAdminProductApi = (id, data) => axios.put(`${adminProductUrl}/${id}`, data);
export const deleteAdminProductApi = (id) => axios.delete(`${adminProductUrl}/${id}`);
export const uploadFileApi = (data) => axios.post(uploadFileUrl, data);
export const getOrdersApi = () => axios.get(`${orderUrl}s`);
