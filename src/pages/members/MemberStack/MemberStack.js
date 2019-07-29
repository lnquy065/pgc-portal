import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './MemberStack.sass'
import Member from "./Member/Member";
import {Card, Icon, Modal} from "antd";
import ContentLoader from "react-content-loader";

const COMMENT_LIMIT = 300

const MemberStack = props => {

    const [stCourse, setStCourse] = useState([]);
    const [stCurrentMember, setStCurrentMember] = useState(null);
    const [stIsModalOpen, setStIsModalOpen] = useState(false);

    useEffect(() => {
        const courseSet = new Set()
        for (const member of props.members) {
            courseSet.add(member.course)
        }
        setStCourse([...courseSet])
    }, [props.members])

    const onOpenDetails = (member) => {
        setStCurrentMember(member)
        setStIsModalOpen(true)
    }

    const onCloseDetails = () => {
        setStCurrentMember(null)
        setStIsModalOpen(true)
    }

    const createCommentLink = () => {
        const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfta5hh_QTeJqWAwGOKuWWVVeVo8xTvf1CV-3WT4OlbF7l3Fg/viewform?entry.1583047956="
        return encodeURI(baseUrl + stCurrentMember.name)
    }

    const createEditLink = () => {
        const baseUrl = `https://docs.google.com/forms/d/e/1FAIpQLSdQRdkrHhH3vs6lN7eDySuqtSa1ArMGHjaN6DO3aN1FhSGcBA/viewform?usp=pp_url&entry.1362246926=${stCurrentMember.name}&entry.1307732569=${stCurrentMember.nickName}&entry.1095974299=${stCurrentMember.course}&entry.1131819850=Gi%E1%BB%AF+%E1%BA%A3nh+hi%E1%BB%87n+t%E1%BA%A1i`
        return encodeURI( baseUrl)
    }

    const buildChairmans = () => {
        const chairmanList = props.members
            .filter(member => member.chairman !== undefined && member.chairman !== '')
        return (
            <div className="course-row course-row--chairman">
                {/*TITLE*/}
                <div className="course-row__title course-row__title--chairman">
                    Chủ Nhiệm
                </div>
                <div className="course-row__title-hr"/>
                {/*MEMBER*/}
                <div className="course-row__member-container">
                    {
                        chairmanList
                            .map(member =>
                                <Member key={member.key}
                                        onClick={() => onOpenDetails(member)}
                                        member={member}/>
                            )
                    }
                </div>
            </div>
        )
    }

    const buildCourses = () => {
        return (
            <>
            {stCourse.map(course => {

                return (
                    <>
                    <div key={course} className="course-row">
                        {/*TITLE*/}
                        <div className="course-row__title" style={{
                            fontSize: '1em'
                        }}>
                            { isNaN(course) ?
                                course
                              :
                                "Khóa " + course
                            }
                        </div>
                        <div className="course-row__title-hr"/>
                        {/*MEMBER*/}
                        <div className="course-row__member-container">
                            {
                                props.members.filter(member => member.course === course)
                                    .map(member =>
                                        <Member key={member.key}
                                                onClick={() => onOpenDetails(member)}
                                                member={member}/>
                                        )
                            }
                        </div>
                    </div>
                    </>
                )})
            }

            </>
        )
    }

    return (
        <div className="member-stack">
            <div className="member-stack__title">
                Thành Viên PGC
            </div>
            {buildChairmans()}
            <div className="course-row__title">
                TẤT CẢ THÀNH VIÊN
            </div>
            {buildCourses()}
            {stCurrentMember &&
            <Modal
                visible={stIsModalOpen}
                onOk={ () => {
                    setStIsModalOpen(false)
                }}
                onCancel={onCloseDetails}
                wrapClassName="member-detail-modal"
            >
                <div className="member-cover-image--loader">
                    <MemberCoverLoader/>
                </div>
                <div className="member-cover-image"
                     style={{
                         backgroundImage: `url(${stCurrentMember.image})`
                     }}>
                </div>

                <div className="member-detail__avatar-wrapper">
                    <div  className="member-detail__avatar--loader">
                        <MemberAvatarLoader/>
                    </div>
                    <div className="member-detail__avatar"
                         style={{
                             backgroundImage: `url(${stCurrentMember.image})`
                         }}>
                    </div>

                    <div className="member-detail__name">
                        {stCurrentMember.name}
                    </div>
                </div>
                <div className="member-detail__info-wrapper">
                    <div className="course">
                        <Icon type="star" /> { isNaN(stCurrentMember.course) ? "":"Khóa: "} {stCurrentMember.course}
                    </div>
                    {stCurrentMember.class &&
                    <div className="class">
                        <Icon type="book" /> { isNaN(stCurrentMember.course) ? "Trường: ":"Lớp: "}
                        {stCurrentMember.class}
                    </div>}
                    {stCurrentMember.chairman &&
                    <div className="nick-name">
                        <Icon type="crown" /> Bang chủ đời thứ {stCurrentMember.chairman}
                    </div>}
                    {stCurrentMember.nickName &&
                    <div className="nick-name">
                        <Icon type="user" /> Nickname: {stCurrentMember.nickName}
                    </div>}
                    {stCurrentMember.facebook &&
                    <div className="facebook">
                        <Icon type="facebook" /> Liên hệ:
                        <a href={stCurrentMember.facebook} target={"_blank"}>
                            &nbsp;Facebook
                        </a>
                    </div>}
                    <hr/>
                    {stCurrentMember.story && <div className="comment">
                        "{stCurrentMember.story.substr(0, COMMENT_LIMIT)}

                        {/*SHOW ELLIPSIS*/}
                        {stCurrentMember.story.length > COMMENT_LIMIT && "..."}"

                        {/*SHOW LOAD MORE*/}
                        {stCurrentMember.story.length > COMMENT_LIMIT &&
                        <div className="load-more"  onClick={() =>
                            window.open('/members/story/' + stCurrentMember.key, 'blank')
                        }>
                            Xem thêm
                        </div>
                        }
                    </div>}

                    {!stCurrentMember.story && <div className="comment--empty">
                        {stCurrentMember.name} vẫn chưa có cảm nhận nào về PGC <br/>
                        Nếu bạn là {stCurrentMember.name} hãy chọn "Gửi cảm nhận" bên dưới để gửi ngay nhé!
                    </div>}
                </div>
                <div  className="member-detail__btn-wrapper">
                    <div className="btn-footer" onClick={() =>
                        window.open(createEditLink(), 'blank')}
                    >
                        <Icon type="edit" /> Chỉnh sửa
                    </div>
                    <div className="btn-footer" onClick={() =>
                        window.open(createCommentLink(), 'blank')
                    }>
                        <Icon type="message" /> Gửi cảm nhận
                    </div>
                </div>
            </Modal>}
        </div>
    );
};

const MemberCoverLoader = () => (
    <ContentLoader
        height={150}
        width={400}
        speed={.5}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="0" y="0" rx="5" ry="5" width="400" height="150" />
    </ContentLoader>
)

export const MemberAvatarLoader = () => (
    <ContentLoader
        height={120}
        width={120}
        speed={.5}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <circle cx="60" cy="60" r="60" />
    </ContentLoader>
)

MemberStack.propTypes = {
    members: PropTypes.arrayOf( PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string,
        nickName: PropTypes.string,
        image: PropTypes.string,
        course: PropTypes.string,
        chairman: PropTypes.any,
        facebook: PropTypes.string
    }))
};

export default MemberStack;