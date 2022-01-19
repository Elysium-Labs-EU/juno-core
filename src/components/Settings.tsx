import React, { useEffect } from 'react'
// import FormGroup from '@mui/material/FormGroup'
// import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

const Settings = () =>{
    useEffect(() => {
        if(localStorage.getItem('showAvatar') === null || (localStorage.getItem('showAvatar') !== "true" && localStorage.getItem('showAvatar') !== "false" )) {
            localStorage.setItem('showAvatar', "true")
        }
    }, [])

    const switchAvatarView = () => {
        if(localStorage.getItem('showAvatar') === "true") {
            localStorage.setItem('showAvatar', "false")
        } 
        else {
            localStorage.setItem('showAvatar', "true")
        }
    }

    return (
        <Switch onClick={()=>switchAvatarView()} defaultChecked={localStorage.getItem('showAvatar') === "true"}/> 
    )
}

export default Settings
