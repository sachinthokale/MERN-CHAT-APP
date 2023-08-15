import React from 'react'
import "./UserBadgeItem.css"
import CancelIcon from '@mui/icons-material/Cancel';

const UserBadgeItem = ({ user, handleFunction }) => {
    return (
        <>
            <p onClick={handleFunction}>{user.name}
                <CancelIcon /> </p>




        </>
    )
}

export default UserBadgeItem