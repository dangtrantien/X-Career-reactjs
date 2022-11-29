import axios from 'axios';

// const API_URL = 'https://x-career-06-team1-be.as.r.appspot.com/api';
const API_URL = 'http://localhost:3002/api';

export default class TaskAPI {
  constructor() {
    this.api = API_URL;

    this.endpoint = 'tasks';
  }

  createNew = async (data) => {
    const res = await axios({
      method: 'POST',
      url: `${this.api}/${this.endpoint}/createTask`,
      data: {
        task: data,
      },
    });

    return res;
  };

  getAll = async () => {
    const res = await axios({
      method: 'GET',
      url: `${this.api}/${this.endpoint}/getAllTasksOfAllBoards`,
      data: null,
    });

    return res;
  };

  getById = async (id) => {
    const res = await axios({
      method: 'GET',
      url: `${this.api}/${this.endpoint}/getTaskById?id=${id}`,
      data: null,
    });

    return res;
  };

  updateById = async (id, data) => {
    const res = await axios({
      method: 'PUT',
      url: `${this.api}/${this.endpoint}/updateTaskById?id=${id}`,
      data: {
        task: data,
      },
    });

    return res;
  };

  deleteById = async (id) => {
    const res = await axios({
      method: 'DELETE',
      url: `${this.api}/${this.endpoint}/deleteTaskById?id=${id}`,
      data: null,
    });

    return res;
  };
}
