import axios from 'axios';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'cofcat-vue-class-2022-api';

const loginUrl = `${apiUrl}/admin/signin`;
const logoutUrl = `${apiUrl}/logout`;
const getProductUrl = `${apiUrl}/api/${apiPath}/admin/products/all`;
const checkLoginUrl = `${apiUrl}/api/user/check`;

export function setDefaultAuth(token) {
  axios.defaults.headers.common.Authorization = token;
}

export const loginApi = (data) => axios.post(loginUrl, data);
export const logoutApi = () => axios.post(logoutUrl);
export const getProductApi = () => axios.get(getProductUrl);
export const checkLoginApi = () => axios.post(checkLoginUrl);
