import * as actions from "./index";
import axios from "axios";

export const userSignIn = (values) => {
    return async (dispatch) => {
        try {
            const user = await axios.post(
                `https://localhost:44369/Account/sign-in`,
                {
                    email: values.email,
                    password: values.password,
                }
            );
            debugger;
            user.then((e) => console.log(e));
            dispatch(actions.userSignIn({ data: user.data.user, auth: true }));
            dispatch(actions.successGlobal("Welcome!!"));
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message));
        }
    };
};
