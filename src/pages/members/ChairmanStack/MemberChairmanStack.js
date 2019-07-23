import React from 'react';
import PropTypes from 'prop-types';
import './MemberChairmanStack.sass'
import MemberStack from "../MemberStack/MemberStack";
import Member from "../MemberStack/Member/Member";

const MemberChairmanStack = props => {
    return (
        <div className="member-chairman-stack" style={{
            display: 'flex'
        }}>
            {
                props.members.map(member => {
                    return <Member key={member.key} member={member}/>
                })
            }
        </div>
    );
};

MemberChairmanStack.propTypes = {
    members: MemberStack.propTypes.members
};

export default MemberChairmanStack;