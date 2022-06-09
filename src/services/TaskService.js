import { baseService } from './baseService';

export class TaskService extends baseService {
  constructor() {
    super();
  }

  createTask = (taskObject) => this.post('api/Project/createTask', taskObject);

  getTaskDetail = (taskId) => this.get(`api/Project/getTaskDetail?taskId=${taskId}`);

  updateStatusTask = (taskStatusUpdate) => this.put('api/Project/updateStatus', taskStatusUpdate);
}

export const taskService = new TaskService();
