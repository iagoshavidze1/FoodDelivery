import * as actions from "./index";
import axios from "axios";

export const userSignIn = (values) => {
    return async (dispatch) => {
        try {
            const user = await axios.post(`/api/auth/signin`, {
                email: values.email,
                password: values.password,
            });
            dispatch(actions.userSignIn({ data: user.data.user, auth: true }));
            dispatch(actions.successGlobal("Welcome!!"));
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message));
        }
    };
};
