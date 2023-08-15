import React, { useState } from 'react'
import "./GroupChatPage.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import OfflinePinIcon from '@mui/icons-material/OfflinePin';

const GroupChatPage = ({ setGroupChatPage, haneleSubmitGroup, setGroupChatName }) => {
    const [checkIcon, setCheckIcon] = useState(false)



    return (
        <>
            <div className="group-name">
                <div className="header" >
                    <div className="headings"
                        onClick={() => { setGroupChatPage(false) }}
                    >
                        < ArrowBackIcon />
                        <h3>Group Subject</h3>
                    </div>

                </div>
                <div className="group-profile-pic">
                    <CameraAltIcon />

                </div>
                <div className="group-name-input">
                    <input type="text" placeholder='Enter Group Name'
                        onChange={(e) => { setCheckIcon(true); setGroupChatName(e.target.value) }} />
                </div>
                <div className="check-icon">
                    {checkIcon && <OfflinePinIcon fontSize='large' onClick={haneleSubmitGroup} />}
                </div>

            </div>
        </>
    )
}

export default GroupChatPage