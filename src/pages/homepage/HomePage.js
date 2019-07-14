import React from 'react';
import PropTypes from 'prop-types';
import './HomePage.css'
import HomeCard from "./homeCard/HomeCard";

const STAR_CLASS_NAME = {
    SMALL: 'star-small',
    MEDIUM: 'star-medium',
    LARGE: 'star-large',
}
const HomePage = props => {

    const renderStart = (quantity, className) => {
        let startArr = []
        let x = 0, y = 0
        for (let i = 0 ; i < quantity; i++) {
            x = Math.floor((Math.random() * 150) + -50)
            y = Math.floor((Math.random() * 150) + -50)
            startArr.push(
                <div key={`star${i}`} className={"star " + className} style={{
                    top: `${y}vh`,
                    left: `${x}vw`
                }}/>
            )
        }
        return startArr
    }

    return (
        <div className="home-page">
            <div className="star-container">
                {renderStart(100, STAR_CLASS_NAME.SMALL)}
                {renderStart(70, STAR_CLASS_NAME.MEDIUM)}
                {renderStart(70, STAR_CLASS_NAME.LARGE)}
            </div>

            <div className="home-page__header">
                    <img src="/assets/icons/pgc-logo.jpg" className="home-page__logo"/>
                {/*<span className="home-page__logo-sub-title">*/}
                    {/*CỔNG THÔNG TIN PGC*/}
                {/*</span>*/}
            </div>

            <div className="portal-container">
                <HomeCard title="Đăng ký bài"
                          icon="/assets/icons/001-clipboard.svg"
                            url="https://docs.google.com/spreadsheets/d/1A0delGWrPk6BJQaVTBqMkc7q0LErH4ohfs-wXPQVnpc/edit?usp=sharing"/>
                <HomeCard title="Thành viên" icon="/assets/icons/004-team.svg"/>
                <HomeCard title="Quỹ clb" icon="/assets/icons/002-piggy-bank.svg"/>
                <HomeCard title="Thông báo"  icon="/assets/icons/003-push-pin.svg"/>
            </div>

            <div className="water-mark">
                @ 2019 - PTIT Guitar Club
            </div>
        </div>
    );
};

HomePage.propTypes = {

};

export default HomePage;
