import axios from 'axios';

// const API_URL = 'https://x-career-06-team1-be.as.r.appspot.com/api';
const API_URL = 'http://localhost:3002/api';

export default class UserAPI {
  constructor() {
    this.api = API_URL;

    this.endpoint = 'users';
  }

  signUp = async (data) => {
    const res = await axios({
      method: 'POST',
      url: `${this.api}/${this.endpoint}/createUser`,
      data: {
        user: data,
      },
    });

    return res;
  };

  signIn = async (e, p) => {
    const res = await axios({
      method: 'POST',
      url: `${this.api}/${this.endpoint}/login`,
      data: { email: e, password: p },
    });

    return res;
  };

  sigOut = () => {
    this.token = sessionStorage.removeItem('token');
    this.id = sessionStorage.removeItem('id');
  };

  getAll = async (params) => {
    const res = await axios({
      method: 'GET',
      url: `${this.api}/${this.endpoint}?skip=${params.skip}&limit=${params.limit}&orderBy=${params.orderBy}`,
      data: null,
    });

    return res;
  };

  getById = async (id) => {
    const res = await axios({
      method: 'GET',
      url: `${this.api}/${this.endpoint}/getUserById?id=${id}`,
      data: null,
    });

    return res;
  };

  updateById = async (id, data) => {
    const res = await axios({
      method: 'PUT',
      url: `${this.api}/${this.endpoint}/updateUserById?id=${id}`,
      data: {
        user: data,
      },
    });

    return res;
  };

  deleteById = async (id) => {
    const res = await axios({
      method: 'DELETE',
      url: `${this.api}/${this.endpoint}/deleteUserById?id=${id}`,
      data: null,
    });

    return res;
  };
}
