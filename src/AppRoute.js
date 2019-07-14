import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {NavPath} from "./config/Constants";
import HomePage from "./pages/homepage/HomePage";
import LiveShows from './pages/live-shows'

const AppRoute = props => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={'/'} component={HomePage}/>
                <Route exact path={NavPath.home} component={HomePage}/>
                <Route exact path={NavPath.liveShows} component={LiveShows} />
            </Switch>
        </BrowserRouter>
    );
};

AppRoute.propTypes = {

};

export default AppRoute;
