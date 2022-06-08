import { GET_TASK_DETAIL } from "../constants/Cyberbugs/TaskConstants"

const initialState = {
    taskDetailModal:   {
      "priorityTask": {
        "priorityId": 1,
        "priority": "High"
      },
      "taskTypeDetail": {
        "id": 1,
        "taskType": "bug"
      },
      "assigness": [],
      "lstComment": [],
      "taskId": 4567,
      "taskName": "Spider",
      "alias": "spider",
      "description": "<p>ok ok</p>",
      "statusId": "1",
      "originalEstimate": 20,
      "timeTrackingSpent": 10,
      "timeTrackingRemaining": 10,
      "typeId": 1,
      "priorityId": 1,
      "projectId": 5102
    },
}


export const TaskReducer = (state = initialState,action) => {
    switch (action.type) {

      case GET_TASK_DETAIL: {
        return {...state,taskDetailModal:action.taskDetailModal}
    }

    default:
        return state
    }
}
