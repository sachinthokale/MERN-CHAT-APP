import React, { useState } from 'react'
import "./UpdateGroupModel.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from './UserBadgeItem';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import axios from 'axios';
import UserListItem from './UserListItem';
import { ToastContainer, toast } from 'react-toastify';

const UpdateGroupModel = ({ setGroupChatModel, setFetchAgain, fetchAgain, fetchMessages }) => {
    const [groupChatName, setGroupChatName] = useState()
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState()
    const { selectedChat, setSelectedChat, user } = ChatState()
    const [renameGroup, setRenameGroup] = useState(false)
    const [greenCheck, setGreenCheck] = useState(false)
    const [addGroupMember, setAddGroupMember] = useState(false)

    const handleRemove = async (user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
            toast.warn('Only Admin can remove users', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,

                }
            }
            const { data } = await axios.put('/api/chat/groupremove', {
                chatId: selectedChat._id,
                userId: user1._id
            }, config)

            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain)
            fetchMessages()

        } catch (error) {

        }

    }
    const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast.warn('User allready in Group', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;

        }
        if (selectedChat.groupAdmin._id !== user._id) {
            toast.warn('Only Admin can add users', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;

        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,

                }
            }
            const { data } = await axios.put('/api/chat/groupadd', {
                chatId: selectedChat._id,
                userId: user1._id
            }, config)
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)

            toast.warn('User added Successfully..', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });


        } catch (error) {

        }
    }
    const handleRename = async () => {
        if (!groupChatName) {
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,

                }
            }
            const { data } = await axios.put('/api/chat/rename', {
                chatId: selectedChat._id,
                chatName: groupChatName,
            }, config)
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)

        } catch (error) {

        }
        setGroupChatName("")
    }
    const handleSearch = async (query) => {
        setSearch(query)
        if (!query) {
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }
            const { data } = await axios.get(`/api/user?search=${search}`, config)
            setSearchResult(data);

        } catch (error) {
            console.log(error)

        }
    }


    return (

        <div className='group-model'>
            <div className="profileback" onClick={() => { setGroupChatModel(false) }}>
                < ArrowBackIcon />
                <h3>Group</h3>
            </div>
            <div className="leftModel">
                <img placeholder='upload' />
                <div className="upload_image"><label htmlFor="upload">Upload Group Image</label></div>
                <input type='file' id='upload' />
                <div className="grp-name">
                    <strong>{selectedChat.chatName}
                    </strong>
                    <EditIcon onClick={() => { setRenameGroup(!renameGroup); setAddGroupMember(false) }} />
                    <GroupAddIcon onClick={() => { setAddGroupMember(!addGroupMember); setRenameGroup(false) }} />
                </div>
                {renameGroup && <div className="rename-group-name">
                    <input onChange={(e) => { setGroupChatName(e.target.value) }} onClick={() => { setGreenCheck(true) }} type="text" name="" id="" placeholder='Change Group Name' />
                    <CheckIcon onClick={handleRename} fontSize='large' className={greenCheck ? "active-green" : "nonactive-green"} />
                </div>}
                {addGroupMember && <div className="add-user">
                    <input onChange={(e) => { handleSearch(e.target.value) }} type="text" name="" id="" placeholder='Add user to Group' />
                    {searchResult?.filter(user => user.name.includes(search)).map((u) => {
                        return <UserListItem
                            key={user._id}
                            user={u}
                            handlesearchResult={() => handleAddUser(u)}
                        />
                    })}
                </div>}
            </div>
            <div className="rightModel">

                <div className="group-users">
                    {selectedChat.users.map((u) => (
                        <UserBadgeItem
                            key={user._id}
                            user={u}
                            handleFunction={() => handleRemove(u)}
                        />
                    ))}
                </div>
                <div className="leave-group">
                    <button onClick={() => handleRemove(user)} className='leave-btn'>Leave Group
                        <ArrowRightAltIcon fontSize='large' /> </button>


                </div>

            </div>
            <ToastContainer />
        </div>
    )
}

export default UpdateGroupModel