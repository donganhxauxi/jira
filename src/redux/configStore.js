import { applyMiddleware, combineReducers, createStore } from 'redux';

import reduxThunk from 'redux-thunk';

// middleware saga
import createMiddleWareSaga from 'redux-saga';
import { ModalReducer } from './reducers/ModalReducer';
import { rootSaga } from './sagas/rootSaga';
import { HistoryReducer } from './reducers/HistoryReducer';
import { UserLoginCyberBugsReducer } from './reducers/UserCyberBugsReducer';
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer';
import { ProjectCyberBugsReducer } from './reducers/ProjectCyberBugsReducer';
import { drawerReducer } from './reducers/DrawerCyberbugs';
import { ProjectReducer } from './reducers/ProjectReducer';
import { TaskTypeReducer } from './reducers/TaskTypeReducer';
import { PriorityReducer } from './reducers/PriorityReducer';
import { StatusReducer } from './reducers/StatusReducer';
import { TaskReducer } from './reducers/TaskReducer';

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  // reducer khai báo tại đây
  ModalReducer,

  HistoryReducer,
  UserLoginCyberBugsReducer,
  ProjectCategoryReducer,
  ProjectCyberBugsReducer,
  drawerReducer,
  ProjectReducer,
  TaskTypeReducer,
  PriorityReducer,
  StatusReducer,
  TaskReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middleWareSaga),
);

// gọi saga
middleWareSaga.run(rootSaga);

export default store;
