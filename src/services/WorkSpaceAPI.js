import axios from 'axios';

// const API_URL = 'https://x-career-06-team1-be.as.r.appspot.com/api';
const API_URL = 'http://localhost:3002/api';
const token = sessionStorage.getItem('token');

export default class WorkSpaceAPI {
  constructor() {
    this.api = API_URL;

    this.endpoint = 'workSpaces';
  }

  createNew = async (data) => {
    const res = await axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      url: `${this.api}/${this.endpoint}/createWorkSpace`,
      data: {
        workSpace: data,
      },
    });

    return res;
  };

  getAll = async () => {
    const res = await axios({
      method: 'GET',
      url: `${this.api}/${this.endpoint}/getAllWorkSpacesOfAllUsers`,
      data: null,
    });

    return res;
  };

  getById = async (id) => {
    const res = await axios({
      method: 'GET',
      url: `${this.api}/${this.endpoint}/getWorkSpaceByID?id=${id}`,
      data: null,
    });

    return res;
  };

  getByName = async (name) => {
    const res = await axios({
      method: 'GET',
      url: `${this.api}/${this.endpoint}/getWorkSpaceByName?name=${name}`,
      data: null,
    });

    return res;
  };

  updateById = async (id, data) => {
    const res = await axios({
      method: 'PUT',
      url: `${this.api}/${this.endpoint}/updateWorkSpaceById?id=${id}`,
      data: {
        workSpace: data,
      },
    });

    return res;
  };

  deleteById = async (id) => {
    const res = await axios({
      method: 'DELETE',
      url: `${this.api}/${this.endpoint}/deleteWorkSpaceById?id=${id}`,
      data: null,
    });

    return res;
  };
}
