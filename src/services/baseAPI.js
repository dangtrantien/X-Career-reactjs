import axios from 'axios';

export const host = 'https://x-career-06-team1-be.onrender.com';
// export const host = 'http://localhost:3002';

export class BaseAPI {
  constructor(props) {
    this.api = host;

    this.endpoint = props.endpoint;
  }

  getAll = async (params) => {
    const res = await axios({
      method: 'GET',
      url: `${this.api}/${this.endpoint}?skip=${params.skip}&limit=${params.limit}&orderBy=${params.orderBy}`,
      data: null,
    });

    return res;
  };

  getByID = async (id) => {
    const res = await axios({
      method: 'GET',
      url: `${this.api}/${this.endpoint}/getByID?id=${id}`,
      data: null,
    });

    return res;
  };

  deleteByID = async (id) => {
    const res = await axios({
      method: 'DELETE',
      url: `${this.api}/${this.endpoint}/deleteByID?id=${id}`,
      data: null,
    });

    return res;
  };
}
