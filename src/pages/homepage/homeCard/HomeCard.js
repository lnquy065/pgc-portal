import React from 'react';
import PropTypes from 'prop-types';
import './HomeCard.css'
import {Link} from "react-router-dom";

const HomeCard = props => {
    return (
        <Link to={props.url} target="_blank">
                <div className="home-card">

                    <div className="home-card__wrapper">
                        <img src={props.icon} className="home-card__icon"/>
                    </div>
                    <span className="home-card__title">
                        {props.title}
                    </span>
                </div>
        </Link>
    );
};

HomeCard.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    icon: PropTypes.any,
    redirect: PropTypes.bool
};

export default HomeCard;
