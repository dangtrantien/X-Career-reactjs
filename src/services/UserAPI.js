import axios from 'axios';
import { BaseAPI } from './baseAPI';

export default class UserAPI extends BaseAPI {
  constructor() {
    super({ endpoint: 'api/users' });
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

  updateByID = async (id, data) => {
    const res = await axios({
      method: 'PUT',
      url: `${this.api}/${this.endpoint}/updateUserByID?id=${id}`,
      data: {
        user: data,
      },
    });

    return res;
  };
}
