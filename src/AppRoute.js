import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {NavPath} from "./config/Constants";
import HomePage from "./pages/homepage/HomePage";

const AppRoute = props => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/'} component={HomePage}/>
                <Route path={NavPath.home} component={HomePage}/>
            </Switch>
        </BrowserRouter>
    );
};

AppRoute.propTypes = {

};

export default AppRoute;
