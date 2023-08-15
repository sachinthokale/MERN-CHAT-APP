import React from 'react'
import "./GroupChat.css"
import { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import axios from 'axios';
import UserListItem from './UserListItem';
import { ToastContainer, toast } from 'react-toastify';
import UserBadgeItem from './UserBadgeItem';
import GroupChatPage from './GroupChatPage';

const GroupChat = ({ closeGroupModel, setCloseGroupModel }) => {
    const [groupChatName, setGroupChatName] = useState()
    const [selectedUser, setSelectedUser] = useState([])
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const { user, chats, setChats } = ChatState()
    const [groupChatPage, setGroupChatPage] = useState(false)








    const handleSearch = async (query) => {
        setSearch(query)
        if (!query) {
            return;
        }
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
            }
        }
        const { data } = await axios.get(`/api/user?search=${search}`, config)
        setSearchResult(data);
    }

    const handleGroup = (usertoAdd) => {
        if (selectedUser.includes(usertoAdd)) {
            toast.warn('User allready Selected', {
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
        setSelectedUser([...selectedUser, usertoAdd])


    }
    const handleDelete = (usertoRemove) => {
        setSelectedUser(selectedUser.filter(sel => sel._id !== usertoRemove._id))
        console.log(selectedUser)

    }

    const haneleSubmitGroup = async () => {
        if (!groupChatName || !selectedUser) {
            toast.warn('Please fill all the feilds', {
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
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                }
            }
            const { data } = await axios.post('/api/chat/group', {
                name: groupChatName,
                users: JSON.stringify(selectedUser.map((u) => u._id))
            }, config)
            setChats([data, ...chats])
            toast.warn('Group Created Successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(groupChatName)
            setGroupChatPage(false)
            setCloseGroupModel(false)
        } catch (error) {
            toast.warn('Fail to create group', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }

    }





    return (
        <><div className="add-group-member">
            <div className="header" >
                <div className="headings"
                    onClick={() => {
                        setCloseGroupModel(!closeGroupModel)
                    }}>
                    < ArrowBackIcon />
                    <h3>Add Group Member</h3>
                </div>
                <div className="group-input-member">
                    <input type="text" placeholder='Search Group Member'
                        onChange={(e) => { handleSearch(e.target.value) }} />
                </div>
            </div>

            <div className="added-member">
                {selectedUser.map((u) => {
                    return <UserBadgeItem
                        key={user.id}
                        user={u}
                        handleFunction={() => handleDelete(u)}
                    />
                })}


            </div>
            <div className="member-list">
                {searchResult.filter(user => user.name.includes(search)).map((user) => {
                    return <UserListItem
                        key={user._id}
                        user={user}
                        handlesearchResult={() => handleGroup(user)}
                    />
                })}
            </div>
            <div className="arrow-btn" onClick={() => { setGroupChatPage(true) }} >
                <ArrowCircleRightIcon fontSize='large' />
            </div>
            {groupChatPage && <GroupChatPage setGroupChatPage={setGroupChatPage} haneleSubmitGroup={haneleSubmitGroup} setGroupChatName={setGroupChatName} />}


        </div>


            <ToastContainer />


        </>
    )
}

export default GroupChat