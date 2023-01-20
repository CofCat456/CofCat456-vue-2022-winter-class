import axios from 'axios';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'cofcat-vue-class-2022-api';

const loginUrl = `${apiUrl}/admin/signin`;
const logoutUrl = `${apiUrl}/logout`;
const getProductUrl = `${apiUrl}/api/${apiPath}/admin/products?page`;
const checkLoginUrl = `${apiUrl}/api/user/check`;
const adminProductUrl = `${apiUrl}/api/${apiPath}/admin/product`;

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
