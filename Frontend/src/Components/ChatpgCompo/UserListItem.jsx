import React from 'react'
import "./UserListItem.css"

const UserListItem = ({ user, handlesearchResult }) => {
    return (
        <div onClick={handlesearchResult} className='search-list'>
            <img src={user.pic} alt="" />
            <span>{user.name}</span>
        </div>
    )
}

export default UserListItem