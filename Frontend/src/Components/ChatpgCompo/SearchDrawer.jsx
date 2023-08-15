import React, { useEffect, useState } from 'react'
import "./SearchDrawer.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@chakra-ui/react'
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios"
import { ChatState } from '../../Context/ChatProvider';
import UserListItem from './UserListItem';


const SearchDrawer = ({ setSearchDrawer }) => {
    const { user, setSelectedChat, chats, setChats } = ChatState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([])
    const handleSearch = async (e) => {
        setSearch(e.target.value)
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
    const accessChat = async (userId) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,

                }
            }

            const { data } = await axios.post("/api/chat", { userId }, config)
            if (!chats.find((c) => c._id === data._id)) {
                setChats([data, ...chats])
            }
            setSelectedChat(data)
            setSearchDrawer(false)

        } catch (error) {
            console.log(error)

        }


    }
    return (
        <>
            <div className="tmkc">
                <div className="heading" onClick={() => { setSearchDrawer(false) }}>
                    <  ArrowBackIcon />
                    <h3>Search User</h3>
                </div>
                <div className="input">
                    <input type="text" placeholder='Search or start new chat' onChange={(e) => { handleSearch(e) }} />
                    {search && <Button className='cancle-button'> <CloseIcon /></Button>}
                </div>
                <div className="search-result">{
                    searchResult.filter(user => user.name.includes(search)).map((user) => {
                        return <UserListItem
                            key={user._id}
                            user={user}
                            handlesearchResult={() => accessChat(user._id)}
                        />


                    })
                }</div>
            </div>

        </>
    )
}

export default SearchDrawer