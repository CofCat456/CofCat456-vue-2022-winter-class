import axios from 'axios';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'cofcat-vue-class-2022-api';

const loginUrl = `${apiUrl}/admin/signin`;
const logoutUrl = `${apiUrl}/logout`;
const getProductUrl = `${apiUrl}/api/${apiPath}/admin/products?page`;
const checkLoginUrl = `${apiUrl}/api/user/check`;
const adminProductUrl = `${apiUrl}/api/${apiPath}/admin/product`;
const uploadFileUrl = `${apiUrl}/api/${apiPath}/admin/upload`;
const shopCartUrl = `${apiUrl}/api/${apiPath}/cart`;

export function setDefaultAuth(token) {
  axios.defaults.headers.common.Authorization = token;
}

export const loginApi = (data) => axios.post(loginUrl, data);
export const logoutApi = () => axios.post(logoutUrl);
export const getProductApi = (page) => axios.get(`${getProductUrl}=${page}`);
export const checkLoginApi = () => axios.post(checkLoginUrl);
export const addProductApi = (data) => axios.post(adminProductUrl, data);
export const editProductApi = (id, data) => axios.put(`${adminProductUrl}/${id}`, data);
export const deleteProductApi = (id) => axios.delete(`${adminProductUrl}/${id}`);
export const uploadFileApi = (data) => axios.post(uploadFileUrl, data);
export const getShopCartApi = () => axios.get(shopCartUrl);
export const addShopCartApi = (data) => axios.post(shopCartUrl, data);
export const removeShopCartApi = (id) => axios.delete(`${shopCartUrl}/${id}`);
export const removeAllShopCartApi = () => axios.delete(shopCartUrl);
