import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {NavPath} from "./config/Constants";
import HomePage from "./pages/homepage/HomePage";
import LiveShows from './pages/live-shows'
import Members from "./pages/members/Members";
import MemberUploader from "./pages/members/upload/MemberUploader";

const AppRoute = props => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={'/'} component={HomePage}/>
                <Route exact path={NavPath.home} component={HomePage}/>
                <Route exact path={NavPath.liveShows} component={LiveShows} />
                <Route exact path={NavPath.members} component={Members} />
                <Route exact path={NavPath.membersUpload} component={MemberUploader} />
            </Switch>
        </BrowserRouter>
    );
};

AppRoute.propTypes = {

};

export default AppRoute;
