import { applyMiddleware, combineReducers, createStore } from "redux";
import { HistoryReducer } from "./reducers/HistoryReducer";
import { ModalReducer } from "./reducers/ModalReducer";
import reduxThunk from "redux-thunk";

//middleware saga
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import { UserLoginCyberBugsReducer } from "./reducers/UserCyberBugsReducer";

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  //reducer khai báo tại đây
  ModalReducer,
  HistoryReducer,
  UserLoginCyberBugsReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middleWareSaga)
);

//gọi saga
middleWareSaga.run(rootSaga);

export default store;
