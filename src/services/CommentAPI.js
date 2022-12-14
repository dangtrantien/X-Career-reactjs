import axios from 'axios';
import { BaseAPI } from './baseAPI';

const token = sessionStorage.getItem('token');

export default class CommentAPI extends BaseAPI {
  constructor() {
    super({ endpoint: 'api/comments' });
  }

  createNew = async (data) => {
    const res = await axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      url: `${this.api}/${this.endpoint}/addComment`,
      data: {
        comment: data,
      },
    });

    return res;
  };

  getByTaskID = async (id) => {
    const res = await axios({
      method: 'GET',
      url: `${this.api}/${this.endpoint}/getCommentByTaskID?id=${id}`,
      data: null,
    });

    return res;
  };

  updateByID = async (id, data) => {
    const res = await axios({
      method: 'PUT',
      url: `${this.api}/${this.endpoint}/updateCommentByID?id=${id}`,
      data: {
        comment: data,
      },
    });

    return res;
  };
}
