import { Switch, Route, BrowserRouter } from "react-router-dom";

import SignUp from "components/auth/sign-up/sign-up";
import SignIn from "components/auth/sign-in/Sign-In";

const Routes = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
