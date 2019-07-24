import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './MembersStory.sass'
import Stars from "../../components/Stars/Stars";
import {MemberService} from "../../services/membersService";
import {Button, Icon} from "antd";

const MembersStory = props => {

    const [stMember, setStMember] = useState(null);

    useEffect(() => {
        const memberId = props.match.params.id

        MemberService.get(memberId)
            .then(doc => {
                setStMember(doc.data())
            })

    }, []);

    const url = window.location.href
    return (
        <div className="members-story df-background">
            <Stars />
            {stMember &&
            <div className="content">
                <div className="author-container">
                    <h2 style={{color: 'white'}}>
                    {stMember.name}
                    </h2>
                    <hr className="hr-style1"/>
                </div>
                <div className="story-container">
                    <pre style={{
                        whiteSpace: 'pre-line'
                    }}> "{stMember.story}" </pre>
                </div>
                <div className="author-footer-container">
                    <hr className="hr-style1"/>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        {stMember.storyDate}

                        <div className="fb-share-button"
                             data-href={url}
                            data-layout="button" data-size="small">
                        <a target="_blank"
                           href={"https://www.facebook.com/sharer/sharer.php?u=" + url}
                           className="fb-xfbml-parse-ignore">
                            <Button type={"primary"}>
                                <Icon type="facebook" />
                                Chia sẻ ngay
                            </Button>
                        </a>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};

MembersStory.propTypes = {};

export default MembersStory;