import { combineReducers } from "redux";
import users from "./users.reducer";
import notifications from "./notification.reducer";

const appReducers = combineReducers({
    users,
    notifications,
});

export default appReducers;
