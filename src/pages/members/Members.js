import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Members.sass'
import {StorageService} from "../../services/storageService";
import {MemberService} from "../../services/membersService";
import Stars from "../../components/Stars/Stars";
import MemberStack from "./MemberStack/MemberStack";
import MemberChairmanStack from "./ChairmanStack/MemberChairmanStack";


const Members = props => {


    const [stMembers, setStMembers] = useState([]);

    useEffect(() => {
        MemberService.getAllOrderByCourseASC()
            .then(docs => {
                const memberList = docs.map(doc => {
                    return {
                        ...doc.data(),
                        key: doc.key
                    }
                })
                setStMembers(memberList)
            })
    }, [])


    return (
        <div className="members">
            <Stars/>
            <MemberStack members={stMembers}/>
        </div>
    );
};

Members.propTypes = {};

export default Members;