import axios from 'axios';
import { BaseAPI } from './baseAPI';

export default class TaskAPI extends BaseAPI {
  constructor() {
    super({ endpoint: 'api/tasks' });
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

  updateByID = async (id, data) => {
    const res = await axios({
      method: 'PUT',
      url: `${this.api}/${this.endpoint}/updateTaskByID?id=${id}`,
      data: {
        task: data,
      },
    });

    return res;
  };
}
