import axios from 'axios';

const api_url = 'https://vue3-course-api.hexschool.io/v2';
const api_path = 'cofcat-vue-class-2022-api';

const api_login = `${api_url}/admin/signin`;
const api_logout = `${api_url}/logout`;
const api_getProduct = `${api_url}/api/${api_path}/admin/products/all`;
const api_checkLogin = `${api_url}/api/user/check`;

export const setDefaultAuth = (token) => (axios.defaults.headers.common['Authorization'] = token);

export const loginApi = (data) => axios.post(api_login, data);
export const logoutApi = () => axios.post(api_logout);
export const getProductApi = () => axios.get(api_getProduct);
export const checkLoginApi = () => axios.post(api_checkLogin);
