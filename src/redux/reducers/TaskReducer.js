const initialState = {
    taskDetailModal:   {
        "priorityTask": {
          "priorityId": 4,
          "priority": "Lowest"
        },
        "taskTypeDetail": {
          "id": 2,
          "taskType": "new task"
        },
        "assigness": [
          {
            "id": 1027,
            "avatar": "https://ui-avatars.com/api/?name=thanh",
            "name": "thanh",
            "alias": "khai"
          },
          {
            "id": 1024,
            "avatar": "https://ui-avatars.com/api/?name=zoro112212",
            "name": "zoro112212",
            "alias": "le-ngoai-ngu"
          },
          {
            "id": 850,
            "avatar": "https://ui-avatars.com/api/?name=hehehe123",
            "name": "hehehe123",
            "alias": "thangtv"
          }
        ],
        "lstComment": [
          {
            "id": 4120,
            "idUser": 1913,
            "name": "hongkongdoll",
            "avatar": "https://ui-avatars.com/api/?name=hongkongdoll",
            "commentContent": "hi"
          }
        ],
        "taskId": 4558,
        "taskName": "spiderman",
        "alias": "spiderman",
        "description": "<p>patman spiderman</p>",
        "statusId": "1",
        "originalEstimate": 30,
        "timeTrackingSpent": 10,
        "timeTrackingRemaining": 10,
        "typeId": 2,
        "priorityId": 4,
        "projectId": 5081
      },
}


export const TaskReducer = (state = initialState,action) => {
    switch (action.type) {

    default:
        return state
    }
}
