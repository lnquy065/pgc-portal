import React from 'react';
import PropTypes from 'prop-types';
import './Member.sass'
import {Badge, Icon, Tooltip} from "antd";
import {MemberAvatarLoader} from "../MemberStack";

const Member = props => {

    const {key, name, course, image, nickName, chairman} = props.member
    const {member, ...other} = props
    return (
        <div className="member" {...other}>

                <Badge count={chairman &&
                    <span>
                        <Icon type="crown" />
                        &nbsp;
                        {chairman}
                    </span>}>
                    <Tooltip overlayClassName="member-tooltips" title={
                        <div>
                            {name}
                            <span className="member-tooltips__nickname">
                        {nickName}
                    </span>
                        </div>
                    }>
                    <div  className="member__avatar"
                    style={{
                        backgroundImage: `url(${image})`
                    }}/>
                    </Tooltip>
                </Badge>
        </div>
    );
};

Member.propTypes = {
    member: PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string,
        nickName: PropTypes.string,
        image: PropTypes.string,
        course: PropTypes.string,
        chairman: PropTypes.number
    })
};

export default Member;