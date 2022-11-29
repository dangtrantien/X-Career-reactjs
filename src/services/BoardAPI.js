import axios from 'axios';

// const API_URL = 'https://x-career-06-team1-be.as.r.appspot.com/api';
const API_URL = 'http://localhost:3002/api';
const token = sessionStorage.getItem('token');

export default class BoardAPI {
  constructor() {
    this.api = API_URL;

    this.endpoint = 'boards';
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

  getById = async (id) => {
    const res = await axios({
      method: 'GET',
      url: `${this.api}/${this.endpoint}/getBoardByID?id=${id}`,
      data: null,
    });

    return res;
  };

  updateById = async (id, data) => {
    const res = await axios({
      method: 'PUT',
      url: `${this.api}/${this.endpoint}/updateBoardById?id=${id}`,
      data: {
        board: data,
      },
    });

    return res;
  };

  deleteById = async (id) => {
    const res = await axios({
      method: 'DELETE',
      url: `${this.api}/${this.endpoint}/deleteBoardById?id=${id}`,
      data: null,
    });

    return res;
  };
}
