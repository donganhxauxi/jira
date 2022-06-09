import { baseService } from './baseService';

export class ProjectService extends baseService {
  constructor() {
    super();
  }

  getAllProject = () => this.get('api/Project/getAllProject');

  deleteProject = (id) => this.delete(`api/Project/deleteProject?projectId=${id}`);

  getProjectDetail = (projectId) => this.get(`api/Project/getProjectDetail?id=${projectId}`);
}

export const projectService = new ProjectService();
