import { baseService } from "./baseService";

export class TaskService extends baseService {
  constructor() {
    super();
  }
  createTask = (taskObject) => {
    return this.post("api/Project/createTask", taskObject);
  }

  getTaskDetail = (taskId) => {
    return this.get(`api/Project/getTaskDetail?taskId=${taskId}`)
}

updateStatusTask = (taskStatusUpdate) => {
  return this.put(`api/Project/updateStatus`,taskStatusUpdate);
}
}

export const taskService = new TaskService();
