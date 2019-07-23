import React from 'react';
import PropTypes from 'prop-types';
import './Stars.sass'

const STAR_CLASS_NAME = {
    SMALL: 'star-small',
    MEDIUM: 'star-medium',
    LARGE: 'star-large',
}

const Stars = props => {


    const renderStar = (quantity, className) => {
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

    const {smallStar, mediumStar, largeStar} = props
    return (
            <div className="star-container">
                {renderStar(smallStar, STAR_CLASS_NAME.SMALL)}
                {renderStar(mediumStar, STAR_CLASS_NAME.MEDIUM)}
                {renderStar(largeStar, STAR_CLASS_NAME.LARGE)}
            </div>
    );
};

Stars.defaultProps = {
    smallStar: 100,
    mediumStar: 70,
    largeStar: 70
}

Stars.propTypes = {
    smallStar: PropTypes.number,
    mediumStar: PropTypes.number,
    largeStar: PropTypes.number
};

export default Stars;