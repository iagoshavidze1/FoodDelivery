import { Switch, Route, BrowserRouter } from "react-router-dom";

import SignIn from "components/auth/sign-in/Sign-In";
import MainLayout from "hocs/mainLayout";
import SignUp from "components/auth/sign-up/Sign-Up";

const Routes = (props) => {
    return (
        <BrowserRouter>
            <MainLayout>
                <Switch>
                    <Route path="/sign-in" component={SignIn} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route path="/" component={SignIn} />
                </Switch>
            </MainLayout>
        </BrowserRouter>
    );
};

export default Routes;
