import axios from 'axios';
import { BaseAPI } from './baseAPI';

const token = sessionStorage.getItem('token');

export default class BoardAPI extends BaseAPI {
  constructor() {
    super({ endpoint: 'api/boards' });
  }

  createNew = async (data) => {
    const res = await axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      url: `${this.api}/${this.endpoint}/createBoard`,
      data: {
        board: data,
      },
    });

    return res;
  };

  getAll = async () => {
    const res = await axios({
      method: 'GET',
      url: `${this.api}/${this.endpoint}/getAllBoardsOfAllWorkSpaces`,
      data: null,
    });

    return res;
  };

  updateByID = async (id, data) => {
    const res = await axios({
      method: 'PUT',
      url: `${this.api}/${this.endpoint}/updateBoardByID?id=${id}`,
      data: {
        board: data,
      },
    });

    return res;
  };
}
