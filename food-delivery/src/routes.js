import { Switch, Route, BrowserRouter } from "react-router-dom";

import SignUp from "./sign-up/sign-up";
import SignIn from "./sign-in/Sign-In";

const Routes = (props) => {
    <BrowserRouter>
        <Switch>
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
        </Switch>
    </BrowserRouter>;
};

export default Routes;
