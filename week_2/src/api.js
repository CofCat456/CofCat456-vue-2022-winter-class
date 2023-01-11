import axios from 'axios';

const authorize = 'cofcat';
const api_url = 'https://vue3-course-api.hexschool.io/v2';

const api_login = `${api_url}/admin/signin`;

export const loginApi = (data) => axios.post(api_login, data);
