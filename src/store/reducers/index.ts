import { combineReducers } from "redux";
import reducer from "./RepositoriesReducer";

const reducers = combineReducers({
  repositories: reducer,
})


export default reducers