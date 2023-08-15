import React, { useState } from 'react'
import "./Navbar.css"
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { ChatState } from '../../Context/ChatProvider';
import { useNavigate } from 'react-router-dom';
import ProfileModel from './ProfileModel';
import SearchDrawer from "./SearchDrawer"
import MyChats from './MyChats';
import { Menu, Tooltip, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import GroupChat from './GroupChat';
import { getSender } from '../../config/ChatLogics';

// import ProfileModel from "./ProfileModel"





const Navbar = ({ fetchAgain, setFetchAgain }) => {
    const navigate = useNavigate()
    const { user, notification, setNotification, selectedChat, setSelectedChat } = ChatState();
    const [logoutbox, setLogoutbox] = useState(false)
    const [showModel, setShowModel] = useState(false)
    const [searchDrawer, setSearchDrawer] = useState(false)
    const [closeGroupModel, setCloseGroupModel] = useState(false)



    return (
        <>
            <div className="navbar">
                <div className="nav_left">

                    <img onClick={() => { setShowModel(!showModel) }} className='avatar' src={user.pic} alt={user.name} />

                    <div className="settings">
                        <Menu>
                            <MenuButton className='notification-icon ' bg="none" border="none">
                                <NotificationsIcon className='notification-icon ' />
                                <span style={{ color: "red" }}>{notification.length}</span>
                            </MenuButton >
                            <MenuList bgColor="white"

                                paddingTop={5}
                                paddingBottom={5}

                                border="1px solid gray"
                                borderRadius={10}>
                                {!notification.length && "No new Message"}
                                {notification.map(notif => (
                                    <MenuItem key={notif._id}
                                        onClick={() => {
                                            setSelectedChat(notif.chat)
                                            setNotification(notification.filter((n) => n !== notif))
                                        }}
                                        border='none'
                                        width="fit-content"
                                        padding={5}
                                        marginTop={5}
                                        marginBottom={5}
                                    >
                                        {notif.chat.isGroupChat ? `New Message in ${notif.chat.chatName}`
                                            : `New message from ${getSender(user, notif.chat.users)}`}


                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                        <PersonSearchIcon onClick={() => { setSearchDrawer(!searchDrawer) }} className='search-icon' />

                        <SettingsIcon className='setting-icon' onClick={() => { setLogoutbox(!logoutbox) }} />
                    </div>


                </div>

                <div className="nav_right ">
                    {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                </div>
                {logoutbox && <div className="logout">
                    <ul>
                        <li onClick={() => { setCloseGroupModel(!closeGroupModel) }}>Create Group</li>
                        <li>Settings</li>
                        <li onClick={() => {
                            localStorage.removeItem("userInfo")
                            navigate('/')
                        }}>Logout</li>
                    </ul>
                </div>
                }
                {showModel && <div className="profileModel">
                    <ProfileModel className="profileModel" user={user} setShowModel={setShowModel} />
                </div>}
                {searchDrawer && <div className="searchDrawer">
                    <SearchDrawer setSearchDrawer={setSearchDrawer} />


                </div>}
                {closeGroupModel && <GroupChat closeGroupModel={closeGroupModel}
                    setCloseGroupModel={setCloseGroupModel} />}


            </div>

        </>
    )
}

export default Navbar