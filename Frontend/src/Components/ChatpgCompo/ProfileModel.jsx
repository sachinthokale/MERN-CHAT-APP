import React from 'react'
import "./ProfileModel.css"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProfileModel = ({ user, children, setShowModel }) => {


    return (
        <><div onClick={() => { setShowModel(false) }} className="profileback">
            < ArrowBackIcon />
            <h3>Profile</h3>
        </div>
            <div className="leftModel">
                <img src={user.pic} alt={user.name} />
                <div className="upload_image"><label htmlFor="upload">Upload Image</label></div>
                <input type="file" id='upload' />
            </div>
            <div className="rightModel">
                <div className="name">
                    <label htmlFor="name">Your Name : </label>
                    <strong>{user.name}</strong>
                </div>
                <div className="email">
                    <label htmlFor="email">Your Email : </label>
                    <strong>{user.email}</strong>
                </div>
            </div>
            {/* <div className="close_menu" >
                <CloseIcon />
            </div> */}


        </>
    )
}

export default ProfileModel