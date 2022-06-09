import { baseService } from './baseService';

export class PriorityService extends baseService {
  constructor() {
    super();
  }

  getAllPriority = () => this.get('api/Priority/getAll');
}

export const priorityService = new PriorityService();
