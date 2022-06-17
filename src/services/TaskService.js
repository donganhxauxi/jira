import { baseService } from './baseService';

export class TaskService extends baseService {
  constructor() {
    super();
  }

  createTask = (taskObject) => this.post('api/Project/createTask', taskObject);

updateStatusTask = (taskStatusUpdate) => {
  return this.put(`api/Project/updateStatus`,taskStatusUpdate);
}
updateTask = (taskUpdate) => {
  return this.post(`api/Project/updateTask`,taskUpdate);
}
}

export const taskService = new TaskService();
