import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
 import './MemberUploader.sass'
import {MemberService} from "../../../services/membersService";
import {StorageService} from "../../../services/storageService";
import {Button, Icon, Input, Modal, Popconfirm, Table, message, Card} from "antd";
import {Link} from "react-router-dom";
const { Search } = Input;

const MemberUploader = props => {
    const [stMembers, setStMembers] = useState([]);
    const [stImage, setStImage] = useState(null);
    const [stIsModalOpen, setStIsModalOpen] = useState(false);
    const [stSearchKeyword, setStSearchKeyword] = useState('');

    const [stCurrentMember, setStCurrentMember] = useState({
        key: null,
        name: '',
        nickName: '',
        course: '',
        image: '',
        chairman: '',
        facebook: ''
    });

    useEffect(() => {
        MemberService.onSnapshot(snapshot => {
            setStMembers(snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    key: doc.id
                }
            }))
        })
    }, [])

    const handleFormChange = (e) => {
        setStCurrentMember({
            ...stCurrentMember,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    const handleEditMember = (member) => {
        setStCurrentMember(member)
        setStIsModalOpen(true)
    }

    const handleCloseModel = () => {
        setStIsModalOpen(false)
        setStImage(null)
        setStCurrentMember({
            key: null,
            name: '',
            nickName: '',
            course: '',
            image: '',
            chairman: '',
            facebook: '',
            class: ''
        })
    }

    const handleImageChange = (e) => {
        setStImage(e.currentTarget.files[0])
    }

    const handleOnRemoveMember = (id) => {
        MemberService.remove(id)
            .then( result => {
                message.success("Xóa thành công!!")
            })
    }

    const handleSearch = (value) => {
        setStSearchKeyword(value)
    }

    const handleOnSubmit = () => {
        const filePath = 'members/' + StorageService.nonAccentVietnamese((stCurrentMember.name + ' ' + stCurrentMember.course).split(' ').join('-'))
        const {key, ...request} = stCurrentMember
        message.loading("Đang xử lý ...")
        if (stCurrentMember.key) { // => EDIT
            if (stImage) { // => upload new
                uploadAvatar(filePath)
                    .then(downloadUrl => {
                        MemberService.update(key, {
                            ...request,
                            image: downloadUrl
                        })
                        .then(result => {
                            handleCloseModel()
                            message.success("Cập nhật thành công!!")

                        })
                    })
            } else {
                MemberService.update(key, {
                    ...request
                })
                    .then(result => {
                        handleCloseModel()
                        message.success("Cập nhật thành công!!")

                    })
            }
        } else { // => ADD NEW
            uploadAvatar(filePath)
                .then(downloadUrl => {
                    MemberService.addNew({
                        ...request,
                        image: downloadUrl
                    })
                    .then(result => {
                        handleCloseModel()
                        message.success("Cập nhật thành công!!")
                    })
                })
        }


    }

    const uploadAvatar = (filePath) => {
        return new Promise( resolve => {
            StorageService.uploadFile(stImage, filePath)
                .then(snapshot => {
                    resolve(snapshot.ref.getDownloadURL())
                })
        })
    }

    return (
        <div className="member-uploader">
            {stCurrentMember &&
            <Modal
                visible={stIsModalOpen}
                onCancel={() => handleCloseModel()}
                onOk={() => handleOnSubmit()}
                title={"Thêm thành viên/Chỉnh sửa thành viên"}
                >
                <div className="member-uploader-modal-content">
                    <Input name="name" value={stCurrentMember.name} placeholder="Họ tên" onChange={handleFormChange}/>
                    <br/>
                    <Input name="nickName" value={stCurrentMember.nickName} placeholder="Nickname"  onChange={handleFormChange}/>
                    <br/>
                    <Input name="course" value={stCurrentMember.course} placeholder="Khóa (vd: 2014)"  onChange={handleFormChange}/>
                    <br/>
                    <Input name="class" value={stCurrentMember.class} placeholder="Lớp"  onChange={handleFormChange}/>
                    <br/>
                    <Input name="chairman" value={stCurrentMember.chairman} placeholder="Đời chủ nhiệm"  onChange={handleFormChange}/>
                    <br/>
                    <Input name="facebook" value={stCurrentMember.facebook} placeholder="Facebook"  onChange={handleFormChange}/>
                    <br/>
                    <input type="file" onChange={handleImageChange}/>
                    <br/>
                </div>
            </Modal>}

            <Card title="Quản lý thành viên">
                <div className="member-controller">
                    <Search
                        placeholder="Tìm kiếm"
                        onSearch={handleSearch}
                        style={{ width: 200 }}
                    />
                    <Button onClick={() => setStIsModalOpen(true)}>
                        Thêm mới
                    </Button>
                </div>
                <Table bordered
                    dataSource={
                    stMembers.map((member, index) => {
                        const memberObj = {
                            key: index+1,
                            name: member.name,
                            course: member.course,
                            chairman: member.chairman,
                            nickName: member.nickName,
                            image: member.image,
                            class: member.class,
                            action: member
                        }

                        if (stSearchKeyword) { // => enable search
                            if (member.name.includes(stSearchKeyword) ||
                                member.course.includes(stSearchKeyword) ||
                                member.nickName.includes(stSearchKeyword)
                            ) { // => found
                                return memberObj
                            } else { // => not found
                                return null
                            }
                        } else { // => disable search
                            return memberObj
                        }
                    }).filter(member => member !== null)
                }
                       columns={[
                    {
                        title: '#',
                        dataIndex: 'key',
                        key: 'key'
                    },
                    {
                        title: 'Họ tên',
                        dataIndex: 'name',
                        key: 'name'
                    },
                    {
                        title: 'Nickname',
                        dataIndex: 'nickName',
                        key: 'nickName'
                    },
                    {
                        title: 'Khóa',
                        dataIndex: 'course',
                        key: 'course'
                    },
                   {
                       title: 'Lớp',
                       dataIndex: 'class',
                       key: 'class'
                   },
                    {
                        title: 'Chủ nhiệm',
                        dataIndex: 'chairman',
                        key: 'chairman'
                    },
                    {
                        title: 'Hình ảnh',
                        dataIndex: 'image',
                        key: 'image',
                        render: (url) => {
                            return (
                                <img alt={url} src={url} style={{
                                    width: '2em',
                                    height: '2em'
                                }}/>
                            )
                        }
                    },
                    {
                        title: 'Hành động',
                        dataIndex: 'action',
                        key: 'action',
                        render: (member) => {
                            return(
                                <div>
                                    <Button type="primary" onClick={() =>
                                        window.open(member.facebook, 'blank')
                                    }>
                                        <Icon type="facebook" />
                                    </Button>
                                    <Button onClick={() => handleEditMember(member)}>
                                        <Icon type="edit" />
                                    </Button>
                                    <Popconfirm
                                        title={"Xóa thành viên này?"}
                                        okText={"Xóa"}
                                        cancelText={"Không"}
                                        onConfirm={() => {
                                            handleOnRemoveMember(member.key)
                                        }}
                                    >
                                        <Button type="danger">
                                            <Icon type="delete" />
                                        </Button>
                                    </Popconfirm>
                                </div>
                            )
                        }
                    }
                ]}/>
            {/*    Danh sách thành viên*/}
            {/*    <br/>*/}
            {/*    <ul>*/}
            {/*        {stMembers.map( member => {*/}
            {/*            return  (*/}
            {/*                <li key={member.key}>*/}
            {/*                    {member.name} - {member.course} -  {member.nickName} - <img style={{width: '2em'}} src={member.image}/>*/}
            {/*                </li>*/}
            {/*            )*/}
            {/*        })}*/}
            {/*    </ul>*/}
            </Card>
        </div>
    );
};

MemberUploader.propTypes = {};

export default MemberUploader;