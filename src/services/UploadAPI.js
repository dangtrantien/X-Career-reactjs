import axios from 'axios';
import { BaseAPI } from './baseAPI';

export default class UploadAPI extends BaseAPI {
  constructor() {
    super({ endpoint: 'api/uploads' });
  }

  uploadFile = async (data) => {
    const res = await axios({
      method: 'POST',
      url: `${this.api}/${this.endpoint}/uploadFile`,
      data: {
        upload: data,
      },
    });

    return res;
  };

  getFromTask = async () => {
    const res = await axios({
      method: 'GET',
      url: `${this.api}/${this.endpoint}/getAllFilesOfAllTasks`,
      data: null,
    });

    return res;
  };

  getFromComment = async () => {
    const res = await axios({
      method: 'GET',
      url: `${this.api}/${this.endpoint}/getAllFilesOfAllComments`,
      data: null,
    });

    return res;
  };
}
