import {
    SIGN_IN,
    SIGN_OUT,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
} from "../types";

//USER
export const userSignIn = (user) => ({
    type: SIGN_IN,
    payload: user,
});

export const userSignOut = () => ({
    type: SIGN_OUT,
});

/// NOTIFICATIONS

export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload: msg,
});

export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload: msg,
});

export const clearNotification = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_NOTIFICATION,
        });
    };
};
